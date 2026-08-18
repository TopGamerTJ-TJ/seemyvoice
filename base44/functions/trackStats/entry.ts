/**
 * trackStats — increments global site statistics (words translated, visitors)
 * and returns the current totals. Called from the frontend on page load
 * (visitor tracking via cookie) and after each translation (word count).
 *
 * Input:  { newVisitor: boolean, wordsAdded: number }
 * Output: { totalWords: number, totalVisitors: number }
 */
import { createClientFromRequest } from "npm:@base44/sdk@0.8.40";

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const newVisitor = Boolean(body?.newVisitor);
    const wordsAdded = Number(body?.wordsAdded) || 0;

    // Ensure the global stats record exists
    const existing = await base44.asServiceRole.entities.SiteStats.filter({
      stat_key: "global",
    });
    if (!existing[0]) {
      await base44.asServiceRole.entities.SiteStats.create({
        stat_key: "global",
        total_words: 0,
        total_visitors: 0,
      });
    }

    // Atomically increment counters
    const inc = {};
    if (wordsAdded > 0) inc.total_words = wordsAdded;
    if (newVisitor) inc.total_visitors = 1;
    if (Object.keys(inc).length > 0) {
      await base44.asServiceRole.entities.SiteStats.updateMany(
        { stat_key: "global" },
        { $inc: inc }
      );
    }

    // Read back current values
    const updated = await base44.asServiceRole.entities.SiteStats.filter({
      stat_key: "global",
    });
    const record = updated[0];

    return Response.json({
      totalWords: record?.total_words ?? 0,
      totalVisitors: record?.total_visitors ?? 0,
    });
  } catch (error) {
    return Response.json(
      { error: error.message, totalWords: 0, totalVisitors: 0 },
      { status: 500 }
    );
  }
}