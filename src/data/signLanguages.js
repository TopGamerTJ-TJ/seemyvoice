/**
 * Sign languages supported by SL Now.
 * Each entry maps to a video dictionary source used by getSignVideoUrl.
 */
export const SIGN_LANGUAGES = [
  { id: "asl", name: "American Sign Language", shortName: "ASL", source: "SignASL.org" },
  { id: "bsl", name: "British Sign Language", shortName: "BSL", source: "SignBSL.com" },
  { id: "auslan", name: "Australian Sign Language", shortName: "Auslan", source: "Auslan Signbank" },
  { id: "lsf", name: "French Sign Language", shortName: "LSF", source: "Spreadthesign.com" },
  { id: "dgs", name: "German Sign Language", shortName: "DGS", source: "Spreadthesign.com" },
  { id: "lse", name: "Spanish Sign Language", shortName: "LSE", source: "Spreadthesign.com" },
  { id: "lis", name: "Italian Sign Language", shortName: "LIS", source: "Spreadthesign.com" },
];

export function getSignLanguage(id) {
  return SIGN_LANGUAGES.find((lang) => lang.id === id) || SIGN_LANGUAGES[0];
}