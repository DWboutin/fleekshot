import { useEffect } from "react";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  useQueryClient,
} from "react-query";
import { PostFormatted } from "../../../server/api/post/dto/PostDTO";
import HttpRequestService from "../../../services/HttpRequestService";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loadPosts, selectPosts } from "../store/postsSlice";

export interface PostsWallSelectors {
  posts: PostFormatted[];
  hasNextPage: boolean | undefined;
  isFetching: boolean;
}

export interface PostsWallActions {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<any, unknown>>;
  deletePost: (postId: string) => void;
}

export interface PostsWallHook {
  selectors: PostsWallSelectors;
  actions: PostsWallActions;
}

const fetchPosts = ({ pageParam = 0 }) =>
  HttpRequestService.get(`/post/?cursor=${pageParam}`);

const deletePostRequest = async (postId: string) => {
  const result = await HttpRequestService.delete(`/post/${postId}`);

  return result;
};

export function usePostsWall(): PostsWallHook {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const posts = useAppSelector(selectPosts);
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    "posts",
    fetchPosts,
    {
      getPreviousPageParam: (firstPage) => firstPage.data.lastCursor ?? false,
      getNextPageParam: (lastPage) => lastPage.data.nextCursor ?? false,
    }
  );

  const deletePost = async (postId: string) => {
    await deletePostRequest(postId);
    queryClient.invalidateQueries("posts");
  };

  useEffect(() => {
    const posts: PostFormatted[] = [];

    if (data) {
      data.pages.forEach((page) => {
        posts.push(...page.data.posts);
      });
    }

    dispatch(loadPosts(posts));
  }, [data]);

  return {
    selectors: { posts, hasNextPage, isFetching },
    actions: { fetchNextPage, deletePost },
  };
}
