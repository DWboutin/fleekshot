import sharp from "sharp";

export enum ImagePaths {
  ProfilePicture = "public/uploads/user",
  MinifiedProfilePicture = "public/uploads/user/resized",
}

class ImageOptimizationService {
  public async minifyAvatarImage(
    file: Express.Multer.File,
    destination: string
  ) {
    await sharp(file.path)
      .resize(200, 200)
      .jpeg({ quality: 90 })
      .toFile(destination);
  }
}

export default ImageOptimizationService;
