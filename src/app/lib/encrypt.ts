export function encryptBase64(input: string): string {
  return btoa(input);
}

export function decryptBase64(input: string): string {
  return atob(input);
}
