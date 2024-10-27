/**
 * @author JungHee Wang (github : junghee111111)
 * @since 2024-10-25
 *
 * @description This file provides utility functions for Base64 encoding/decoding,
 * generating preset IDs, and encrypting/decrypting preset data using XOR operations
 * with an initialization vector (IV).
 */

/**
 * 입력 문자열을 Base64로 인코딩합니다.
 * @param input
 * @returns
 */
export function encryptBase64(input: string): string {
  return btoa(encodeURIComponent(input));
}

/**
 * Base64로 인코딩된 문자열을 디코딩합니다.
 * @param input
 * @returns
 */
export function decryptBase64(input: string): string {
  return decodeURIComponent(atob(input));
}

/**
 * 현재 시간과 두 개의 시드 문자열을 사용하여 프리셋 ID를 생성합니다.
 * @author JungHee Wang (github : junghee111111)
 * @param seed2
 * @param seed3
 * @returns
 */
export function generatePresetId(seed2: string, seed3: string) {
  const hash =
    encryptBase64(new Date().toISOString()).substring(-16) +
    encryptBase64(seed2).substring(0, 16) +
    encryptBase64(seed3).substring(0, 32);
  return hash;
}

/**
 * 지정된 길이의 초기화 벡터(IV) 버퍼를 생성합니다. 각 바이트는 0에서 255 사이의 무작위 값입니다.
 * @author JungHee Wang (github : junghee111111)
 * @param len
 * @returns
 */
function generateIVBuffer(len: number): Buffer {
  const IVBuffer = Buffer.alloc(len);
  for (let i = 0; i < len; i++) {
    IVBuffer[i] = Math.floor(Math.random() * 256);
  }
  return IVBuffer;
}

/**
 * 입력 문자열을 XOR 연산을 사용하여 암호화하고, 결과를 Base64로 인코딩합니다.
 * @author JungHee Wang (github : junghee111111)
 * @param bodyString
 * @returns
 */
export function encryptPresets(bodyString: string): string {
  const bodyBuffer = Buffer.from(bodyString);
  const bodyBufferLen = bodyBuffer.length;

  const IVBuffer = generateIVBuffer(bodyBufferLen);

  const encryptedBuffer = Buffer.alloc(bodyBufferLen);
  for (let i = 0; i < bodyBufferLen; i++) {
    encryptedBuffer[i] = bodyBuffer[i] ^ IVBuffer[i];
  }

  const totalBuffer = Buffer.concat([IVBuffer, encryptedBuffer]);
  return totalBuffer.toString("base64");
}

/**
 * Base64로 인코딩된 암호화된 문자열을 디코딩하고, XOR 연산을 사용하여 원래 문자열로 복호화합니다.
 * @author JungHee Wang (github : junghee111111)
 * @param bodyString
 * @returns
 */
export function decryptPresets(bodyString: string): string {
  const totalBuffer = Buffer.from(bodyString, "base64");
  const totalBufferLen = totalBuffer.length;

  // Buffer.slice는 deprecated 되었음!!
  const IVBuffer = totalBuffer.subarray(0, totalBufferLen / 2);
  const encryptedBuffer = totalBuffer.subarray(totalBufferLen / 2);

  const decryptedBuffer = Buffer.alloc(totalBufferLen / 2);
  for (let i = 0; i < totalBufferLen / 2; i++) {
    decryptedBuffer[i] = IVBuffer[i] ^ encryptedBuffer[i];
  }

  return decryptedBuffer.toString();
}
