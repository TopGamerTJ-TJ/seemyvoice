/**
 * getSignVideoUrl — resolves a real sign language video URL for a word/phrase
 * by fetching the appropriate public dictionary page and extracting
 * the first embedded <source> video URL.
 *
 * Input:  { word: string, signLanguage: "asl" | "bsl" }
 * Output: { videoUrl: string|null, pageUrl: string, source: string }
 */
export default async function(req) {
  try {
    const body = await req.json();
    const word = body?.word;
    const signLanguage = body?.signLanguage || "asl";

    if (!word || typeof word !== "string") {
      return Response.json({ error: "word is required" }, { status: 400 });
    }

    // Build the slug: lowercase, trim, collapse spaces to hyphens
    const slug = word.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    // Route to the correct dictionary based on sign language
    let pageUrl, sourceName;
    if (signLanguage === "bsl") {
      pageUrl = `https://www.signbsl.com/sign/${slug}`;
      sourceName = "signbsl.com";
    } else {
      pageUrl = `https://www.signasl.org/sign/${slug}`;
      sourceName = "signasl.org";
    }

    const resp = await fetch(pageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ASLTranslate/1.0)",
        "Accept": "text/html",
      },
      redirect: "follow",
    });

    if (!resp.ok) {
      return Response.json({ videoUrl: null, pageUrl, source: sourceName });
    }

    const html = await resp.text();

    // Extract the first <source src="...mp4"> URL — prefer media.signbsl.com
    const sourceMatch = html.match(/<source\s+src="(https:\/\/media\.signbsl\.com\/[^"]+\.mp4[^"]*)"/);
    const fallbackMatch = html.match(/<source\s+src="(https:\/\/[^"]+\.mp4[^"]*)"/);
    const videoUrl = sourceMatch?.[1] || fallbackMatch?.[1] || null;

    return Response.json({
      videoUrl,
      pageUrl,
      source: sourceName,
    });
  } catch (error) {
    return Response.json({ error: error.message, videoUrl: null }, { status: 500 });
  }
}