export function encryptBase64(input: string): string {
  return btoa(input);
}

export function decryptBase64(input: string): string {
  return atob(input);
}

export function generatePresetId(seed2: string, seed3: string) {
  const hash =
    encryptBase64(new Date().toISOString()).substring(-16) +
    encryptBase64(seed2).substring(0, 16) +
    encryptBase64(seed3).substring(0, 32);
  return hash;
}
