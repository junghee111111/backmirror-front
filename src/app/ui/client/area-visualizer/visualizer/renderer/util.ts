/**
 * @author JungHee Wang (github : junghee111111)
 * @since 2024-10-28
 *
 * @description This file provides utility functions for checking if a file is an image or video file.
 * It also provides a function to get the file extension.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
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
