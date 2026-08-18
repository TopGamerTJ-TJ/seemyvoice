/**
 * Sign languages supported by ASL Translate.
 * Each entry maps to a video dictionary source used by getSignVideoUrl.
 */
export const SIGN_LANGUAGES = [
  { id: "asl", name: "American Sign Language", shortName: "ASL", source: "SignASL.org" },
  { id: "bsl", name: "British Sign Language", shortName: "BSL", source: "SignBSL.com" },
];

export function getSignLanguage(id) {
  return SIGN_LANGUAGES.find((lang) => lang.id === id) || SIGN_LANGUAGES[0];
}