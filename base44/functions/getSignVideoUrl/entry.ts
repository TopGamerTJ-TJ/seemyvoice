/**
 * getSignVideoUrl — resolves a real ASL video URL for a word/phrase
 * by fetching SignASL.org's public dictionary page and extracting
 * the first embedded <source> video URL (hosted on media.signbsl.com).
 *
 * Input:  { word: string }  e.g. "thank you", "hello"
 * Output:  { videoUrl: string|null, pageUrl: string, source: string }
 */
export default async function(req) {
  try {
    const body = await req.json();
    const word = body?.word;
    if (!word || typeof word !== "string") {
      return Response.json({ error: "word is required" }, { status: 400 });
    }

    // Build the SignASL slug: lowercase, trim, collapse spaces to hyphens
    const slug = word.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const pageUrl = `https://www.signasl.org/sign/${slug}`;

    const resp = await fetch(pageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ASLTranslate/1.0)",
        "Accept": "text/html",
      },
      redirect: "follow",
    });

    if (!resp.ok) {
      return Response.json({ videoUrl: null, pageUrl, source: "signasl.org" });
    }

    const html = await resp.text();

    // Extract the first <source src="...mp4..."> URL — prefer media.signbsl.com
    const sourceMatch = html.match(/<source\s+src="(https:\/\/media\.signbsl\.com\/[^"]+\.mp4[^"]*)"/);
    const fallbackMatch = html.match(/<source\s+src="(https:\/\/[^"]+\.mp4[^"]*)"/);
    const videoUrl = sourceMatch?.[1] || fallbackMatch?.[1] || null;

    return Response.json({
      videoUrl,
      pageUrl,
      source: "signasl.org",
    });
  } catch (error) {
    return Response.json({ error: error.message, videoUrl: null }, { status: 500 });
  }
}