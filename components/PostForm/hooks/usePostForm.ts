import { useState } from "react";
import { useQueryClient } from "react-query";
import { PostData } from "../../../server/api/post/dto/PostDTO";
import HttpRequestService from "../../../services/HttpRequestService";

export interface PostFormSelectors {
  isCreating: boolean;
  localImage: string | null;
}

export interface PostFormActions {
  handleFormSubmit: (
    image: File,
    message: PostData,
    resetCallback: () => void
  ) => void;
  setLocalImage: (image: string) => void;
}

export interface PostFormHook {
  selectors: PostFormSelectors;
  actions: PostFormActions;
}

const createPost = async (image: File, post: PostData) => {
  const result = await HttpRequestService.upload("/post/", { image }, post);

  return result;
};

export function usePostForm(): PostFormHook {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [localImage, setLocalImage] = useState<string | null>(null);

  const handleFormSubmit = async (
    image: File,
    message: PostData,
    resetCallback: () => void
  ) => {
    setIsCreating(true);
    await createPost(image, message);
    queryClient.invalidateQueries("posts");

    setIsCreating(false);
    setLocalImage(null);
    resetCallback();
  };

  return {
    selectors: { isCreating, localImage },
    actions: { handleFormSubmit, setLocalImage },
  };
}
