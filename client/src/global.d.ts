interface Cloudinary {
  createUploadWidget: (
    options: any,
    callback: (error: any, result: any) => void
  ) => any;
}

interface Window {
  cloudinary: Cloudinary;
}
