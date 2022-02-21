import path from "path";
import sharp from "sharp";

class ImageOptimizationService {
  public async minifyAvatarImage(
    file: Express.Multer.File,
    destination: string
  ) {
    await sharp(file.path)
      .resize(200, 200)
      .jpeg({ quality: 90 })
      .toFile(path.join(destination, file.filename));
  }
}

export default ImageOptimizationService;
