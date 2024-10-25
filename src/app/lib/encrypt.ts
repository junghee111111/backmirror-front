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

function generateIVBuffer(len: number): Buffer {
  const IVBuffer = Buffer.alloc(len);
  for (let i = 0; i < len; i++) {
    IVBuffer[i] = Math.floor(Math.random() * 256);
  }
  return IVBuffer;
}

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

export function decryptPresets(bodyString: string): string {
  const totalBuffer = Buffer.from(bodyString, "base64");
  const totalBufferLen = totalBuffer.length;

  const IVBuffer = totalBuffer.subarray(0, totalBufferLen / 2);
  const encryptedBuffer = totalBuffer.subarray(totalBufferLen / 2);

  const decryptedBuffer = Buffer.alloc(totalBufferLen / 2);
  for (let i = 0; i < totalBufferLen / 2; i++) {
    decryptedBuffer[i] = IVBuffer[i] ^ encryptedBuffer[i];
  }

  return decryptedBuffer.toString();
}
