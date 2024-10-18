export function checkIfImageFile(obj: any) {
  if (typeof obj === "string") {
    return obj.match(/\.(jpeg|jpg|gif|png|webp)/i) != null;
  }
}

export function checkIfVideoFile(obj: any) {
  if (typeof obj === "string") {
    return obj.match(/\.(mp4|webm|ogg)/i) != null;
  }
}

export function getFileExtension(obj: any) {
  if (typeof obj === "string") {
    return obj.split(".").pop()?.split("?")[0].toLowerCase();
  }
}
