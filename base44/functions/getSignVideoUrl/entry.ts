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
      lsf: "fr.fr",  // French Sign Language (LSF)
      dgs: "de.de",  // German Sign Language (DGS)
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