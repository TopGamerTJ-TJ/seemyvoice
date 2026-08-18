/**
 * getSignVideoUrl — resolves a real sign language video URL for a word/phrase
 * by fetching the appropriate public dictionary page and extracting
 * the embedded video URL.
 *
 * Input:  { word: string, signLanguage: string }
 * Output: { videoUrl: string|null, pageUrl: string, source: string }
 *
 * Supported languages:
 *   asl    — SignASL.org (single fetch)
 *   bsl    — SignBSL.com (single fetch)
 *   auslan — Auslan Signbank (single fetch)
 *   lsf    — Spreadthesign.com / French Sign Language (two-step: search + word page)
 *   dgs    — Spreadthesign.com / German Sign Language (two-step)
 *   lse    — Spreadthesign.com / Spanish Sign Language (two-step)
 *   lis    — Spreadthesign.com / Italian Sign Language (two-step)
 *   jsl    — Spreadthesign.com / Japanese Sign Language (two-step)
 *   csl    — Spreadthesign.com / Chinese Sign Language (two-step)
 *   lgp    — Spreadthesign.com / Portuguese Sign Language (two-step)
 *   ssl    — Spreadthesign.com / Swedish Sign Language (two-step)
 *   pjm    — Spreadthesign.com / Polish Sign Language (two-step)
 *   czsl   — Spreadthesign.com / Czech Sign Language (two-step)
 *   dsl    — Spreadthesign.com / Danish Sign Language (two-step)
 *   fsl    — Spreadthesign.com / Finnish Sign Language (two-step)
 *   hrsl   — Spreadthesign.com / Croatian Sign Language (two-step)
 *   sksl   — Spreadthesign.com / Slovak Sign Language (two-step)
 *   srsl   — Spreadthesign.com / Serbian Sign Language (two-step)
 *   usl    — Spreadthesign.com / Ukrainian Sign Language (two-step)
 *   etsl   — Spreadthesign.com / Estonian Sign Language (two-step)
 *   lsl    — Spreadthesign.com / Lithuanian Sign Language (two-step)
 *   bgsl   — Spreadthesign.com / Bulgarian Sign Language (two-step)
 *   gcs    — Spreadthesign.com / Greek Cypriot Sign Language (two-step)
 *   nzsl   — Spreadthesign.com / New Zealand Sign Language (two-step)
 *   lsa    — Spreadthesign.com / Argentine Sign Language (two-step)
 *   lsch   — Spreadthesign.com / Chilean Sign Language (two-step)
 *   ogs    — Spreadthesign.com / Austrian Sign Language (two-step)
 *   psl    — Spreadthesign.com / Urdu Sign Language (two-step)
 *   intl   — Spreadthesign.com / International Sign (two-step)
 */
export default async function(req) {
  try {
    const body = await req.json();
    const word = body?.word;
    const signLanguage = body?.signLanguage || "asl";

    if (!word || typeof word !== "string") {
      return Response.json({ error: "word is required" }, { status: 400 });
    }

    const slug = word.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const headers = {
      "User-Agent": "Mozilla/5.0 (compatible; ASLTranslate/1.0)",
      "Accept": "text/html",
    };

    // Spread the Sign languages require a two-step lookup:
    // 1) search for the word to get its numeric ID
    // 2) fetch the word page in the target sign language to get the video
    const SPREADTHESIGN_LANGS = {
      lsf: "fr.fr",        // French Sign Language (LSF)
      dgs: "de.de",        // German Sign Language (DGS)
      lse: "es.es",        // Spanish Sign Language (LSE)
      lis: "it.it",        // Italian Sign Language (LIS)
      jsl: "ja.jp",        // Japanese Sign Language (JSL)
      csl: "zh.hans.cn",   // Chinese Sign Language (CSL)
      lgp: "pt.pt",        // Portuguese Sign Language (LGP)
      ssl: "sv.se",        // Swedish Sign Language (SSL)
      pjm: "pl.pl",        // Polish Sign Language (PJM)
      czsl: "cs.cz",       // Czech Sign Language
      dsl: "da.dk",        // Danish Sign Language
      fsl: "fi.fi",        // Finnish Sign Language
      hrsl: "hr.hr",       // Croatian Sign Language
      sksl: "sk.sk",       // Slovak Sign Language
      srsl: "sr.rs",       // Serbian Sign Language
      usl: "uk.ua",        // Ukrainian Sign Language
      etsl: "et.ee",       // Estonian Sign Language
      lsl: "lt.lt",        // Lithuanian Sign Language
      bgsl: "bg.bg",       // Bulgarian Sign Language
      gcs: "el.cy",        // Greek Cypriot Sign Language
      nzsl: "en.nz",       // New Zealand Sign Language
      lsa: "es.ar",        // Argentine Sign Language
      lsch: "es.cl",       // Chilean Sign Language
      ogs: "de.at",        // Austrian Sign Language (ÖGS)
      psl: "ur.pk",        // Urdu Sign Language
      intl: "isl.intl",    // International Sign
    };

    const targetLang = SPREADTHESIGN_LANGS[signLanguage];
    if (targetLang) {
      const sourceName = "spreadthesign.com";

      // Step 1: search
      const searchUrl = `https://www.spreadthesign.com/en.us/search/?q=${encodeURIComponent(word.toLowerCase().trim())}`;
      const searchResp = await fetch(searchUrl, { headers, redirect: "follow" });
      if (!searchResp.ok) {
        return Response.json({ videoUrl: null, pageUrl: searchUrl, source: sourceName });
      }
      const searchHtml = await searchResp.text();

      // Extract all word IDs + slugs from search result links
      const resultRegex = /\/word\/(\d+)\/([a-z0-9-]+)\/0\//g;
      const results = [];
      let m;
      while ((m = resultRegex.exec(searchHtml)) !== null) {
        results.push({ id: m[1], slug: m[2] });
      }

      if (results.length === 0) {
        return Response.json({ videoUrl: null, pageUrl: searchUrl, source: sourceName });
      }

      // Prefer exact slug match; fall back to first result
      const best = results.find(r => r.slug === slug) || results[0];

      // Step 2: fetch word page in target sign language
      const wordPageUrl = `https://www.spreadthesign.com/en.us-to-${targetLang}/word/${best.id}/${best.slug}/`;
      const wordResp = await fetch(wordPageUrl, { headers, redirect: "follow" });
      if (!wordResp.ok) {
        return Response.json({ videoUrl: null, pageUrl: wordPageUrl, source: sourceName });
      }
      const wordHtml = await wordResp.text();

      // Video is in <video src="...mp4"> on the word page
      const videoMatch = wordHtml.match(/<video[^>]+src="(https:\/\/media\.spreadthesign\.com\/[^"]+\.mp4[^"]*)"/);
      const videoUrl = videoMatch?.[1] || null;

      return Response.json({ videoUrl, pageUrl: wordPageUrl, source: sourceName });
    }

    // Single-fetch dictionaries
    let pageUrl, sourceName;
    if (signLanguage === "bsl") {
      pageUrl = `https://www.signbsl.com/sign/${slug}`;
      sourceName = "signbsl.com";
    } else if (signLanguage === "auslan") {
      pageUrl = `https://auslan.org.au/dictionary/search/?query=${encodeURIComponent(word.toLowerCase().trim())}`;
      sourceName = "auslan.org.au";
    } else {
      pageUrl = `https://www.signasl.org/sign/${slug}`;
      sourceName = "signasl.org";
    }

    const resp = await fetch(pageUrl, { headers, redirect: "follow" });
    if (!resp.ok) {
      return Response.json({ videoUrl: null, pageUrl, source: sourceName });
    }

    const html = await resp.text();

    // Extract first <source src="...mp4"> — prefer signbsl CDN, then any HTTPS mp4
    const sourceMatch = html.match(/<source\s+src="(https:\/\/media\.signbsl\.com\/[^"]+\.mp4[^"]*)"/);
    const fallbackMatch = html.match(/<source\s+src="(https:\/\/[^"]+\.mp4[^"]*)"/);
    const videoUrl = sourceMatch?.[1] || fallbackMatch?.[1] || null;

    return Response.json({ videoUrl, pageUrl, source: sourceName });
  } catch (error) {
    return Response.json({ error: error.message, videoUrl: null }, { status: 500 });
  }
}