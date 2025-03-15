export const validateImage = (
  file: File,
  minSizeKB = 100,
  minWidth = 800,
  minHeight = 800,
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
  const fileSizeKB = file.size / 1024;

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Invalid file type. Allowed: JPEG, PNG, WebP, HEIC.",
    };
  }

  if (fileSizeKB < minSizeKB) {
    return {
      isValid: false,
      error: `File is too small. Minimum size is ${minSizeKB}KB.`,
    };
  }

  return new Promise<{ isValid: boolean; error?: string }>((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width < minWidth || img.height < minHeight) {
        resolve({
          isValid: false,
          error: `Image resolution must be at least ${minWidth}x${minHeight}px.`,
        });
      } else {
        resolve({ isValid: true });
      }
    };
    img.onerror = () =>
      resolve({ isValid: false, error: "Invalid image file." });
  });
};
