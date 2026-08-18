/**
 * Sign languages supported by SL Now.
 * Each entry maps to a video dictionary source used by getSignVideoUrl.
 * `speakers` is an approximate count of people who use/understand that
 * sign language (commonly cited estimates), used for aggregate stats.
 */
export const SIGN_LANGUAGES = [
  { id: "asl", name: "American Sign Language", shortName: "ASL", source: "SignASL.org", speakers: 500000 },
  { id: "bsl", name: "British Sign Language", shortName: "BSL", source: "SignBSL.com", speakers: 151000 },
  { id: "auslan", name: "Australian Sign Language", shortName: "Auslan", source: "Auslan Signbank", speakers: 20000 },
  { id: "lsf", name: "French Sign Language", shortName: "LSF", source: "Spreadthesign.com", speakers: 100000 },
  { id: "dgs", name: "German Sign Language", shortName: "DGS", source: "Spreadthesign.com", speakers: 80000 },
  { id: "lse", name: "Spanish Sign Language", shortName: "LSE", source: "Spreadthesign.com", speakers: 100000 },
  { id: "lis", name: "Italian Sign Language", shortName: "LIS", source: "Spreadthesign.com", speakers: 70000 },
  { id: "jsl", name: "Japanese Sign Language", shortName: "JSL", source: "Spreadthesign.com", speakers: 60000 },
  { id: "csl", name: "Chinese Sign Language", shortName: "CSL", source: "Spreadthesign.com", speakers: 20000000 },
  { id: "lgp", name: "Portuguese Sign Language", shortName: "LGP", source: "Spreadthesign.com", speakers: 60000 },
  { id: "ssl", name: "Swedish Sign Language", shortName: "SSL", source: "Spreadthesign.com", speakers: 8000 },
  { id: "pjm", name: "Polish Sign Language", shortName: "PJM", source: "Spreadthesign.com", speakers: 50000 },
  { id: "czsl", name: "Czech Sign Language", shortName: "CzSL", source: "Spreadthesign.com", speakers: 9000 },
  { id: "dsl", name: "Danish Sign Language", shortName: "DSL", source: "Spreadthesign.com", speakers: 4000 },
  { id: "fsl", name: "Finnish Sign Language", shortName: "FinSL", source: "Spreadthesign.com", speakers: 5000 },
  { id: "hrsl", name: "Croatian Sign Language", shortName: "HRSL", source: "Spreadthesign.com", speakers: 5000 },
  { id: "sksl", name: "Slovak Sign Language", shortName: "SKSL", source: "Spreadthesign.com", speakers: 5000 },
  { id: "srsl", name: "Serbian Sign Language", shortName: "SRSL", source: "Spreadthesign.com", speakers: 5000 },
  { id: "usl", name: "Ukrainian Sign Language", shortName: "USL", source: "Spreadthesign.com", speakers: 5000 },
  { id: "etsl", name: "Estonian Sign Language", shortName: "ETSL", source: "Spreadthesign.com", speakers: 2000 },
  { id: "lsl", name: "Lithuanian Sign Language", shortName: "LSL", source: "Spreadthesign.com", speakers: 4000 },
  { id: "bgsl", name: "Bulgarian Sign Language", shortName: "BGSL", source: "Spreadthesign.com", speakers: 30000 },
  { id: "gcs", name: "Greek Cypriot Sign Language", shortName: "GCS", source: "Spreadthesign.com", speakers: 4000 },
  { id: "nzsl", name: "New Zealand Sign Language", shortName: "NZSL", source: "Spreadthesign.com", speakers: 4500 },
  { id: "lsa", name: "Argentine Sign Language", shortName: "LSA", source: "Spreadthesign.com", speakers: 500000 },
  { id: "lsch", name: "Chilean Sign Language", shortName: "LSCH", source: "Spreadthesign.com", speakers: 100000 },
  { id: "ogs", name: "Austrian Sign Language", shortName: "ÖGS", source: "Spreadthesign.com", speakers: 10000 },
  { id: "psl", name: "Urdu Sign Language", shortName: "PSL", source: "Spreadthesign.com", speakers: 7000000 },
  { id: "intl", name: "International Sign", shortName: "Intl", source: "Spreadthesign.com", speakers: 0 },
];

export function getSignLanguage(id) {
  return SIGN_LANGUAGES.find((lang) => lang.id === id) || SIGN_LANGUAGES[0];
}