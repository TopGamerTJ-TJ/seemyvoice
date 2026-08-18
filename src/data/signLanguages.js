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
  { id: "jsl", name: "Japanese Sign Language", shortName: "JSL", source: "Spreadthesign.com" },
  { id: "csl", name: "Chinese Sign Language", shortName: "CSL", source: "Spreadthesign.com" },
  { id: "lgp", name: "Portuguese Sign Language", shortName: "LGP", source: "Spreadthesign.com" },
  { id: "ssl", name: "Swedish Sign Language", shortName: "SSL", source: "Spreadthesign.com" },
  { id: "pjm", name: "Polish Sign Language", shortName: "PJM", source: "Spreadthesign.com" },
  { id: "czsl", name: "Czech Sign Language", shortName: "CzSL", source: "Spreadthesign.com" },
  { id: "dsl", name: "Danish Sign Language", shortName: "DSL", source: "Spreadthesign.com" },
  { id: "fsl", name: "Finnish Sign Language", shortName: "FinSL", source: "Spreadthesign.com" },
  { id: "hrsl", name: "Croatian Sign Language", shortName: "HRSL", source: "Spreadthesign.com" },
  { id: "sksl", name: "Slovak Sign Language", shortName: "SKSL", source: "Spreadthesign.com" },
  { id: "srsl", name: "Serbian Sign Language", shortName: "SRSL", source: "Spreadthesign.com" },
  { id: "usl", name: "Ukrainian Sign Language", shortName: "USL", source: "Spreadthesign.com" },
  { id: "etsl", name: "Estonian Sign Language", shortName: "ETSL", source: "Spreadthesign.com" },
  { id: "lsl", name: "Lithuanian Sign Language", shortName: "LSL", source: "Spreadthesign.com" },
  { id: "bgsl", name: "Bulgarian Sign Language", shortName: "BGSL", source: "Spreadthesign.com" },
  { id: "gcs", name: "Greek Cypriot Sign Language", shortName: "GCS", source: "Spreadthesign.com" },
  { id: "nzsl", name: "New Zealand Sign Language", shortName: "NZSL", source: "Spreadthesign.com" },
  { id: "lsa", name: "Argentine Sign Language", shortName: "LSA", source: "Spreadthesign.com" },
  { id: "lsch", name: "Chilean Sign Language", shortName: "LSCH", source: "Spreadthesign.com" },
  { id: "ogs", name: "Austrian Sign Language", shortName: "ÖGS", source: "Spreadthesign.com" },
  { id: "psl", name: "Urdu Sign Language", shortName: "PSL", source: "Spreadthesign.com" },
  { id: "intl", name: "International Sign", shortName: "Intl", source: "Spreadthesign.com" },
];

export function getSignLanguage(id) {
  return SIGN_LANGUAGES.find((lang) => lang.id === id) || SIGN_LANGUAGES[0];
}