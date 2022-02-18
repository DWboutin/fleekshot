import sharp from "sharp";

export enum ImagePaths {
  ProfilePicture = "public/uploads/user",
  MinifiedProfilePicture = "public/uploads/user/resized",
}

class ImageOptimizationService {
  public minifyAvatarImage = jest.fn();
}

export default ImageOptimizationService;
