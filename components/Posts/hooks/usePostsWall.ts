import { useEffect } from "react";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { PostFormatted } from "../../../server/api/post/dto/PostDTO";
import HttpRequestService from "../../../services/HttpRequestService";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addPosts, loadPosts, selectPosts } from "../store/postsSlice";

export interface PostsWallSelectors {
  posts: PostFormatted[];
  hasNextPage: boolean | undefined;
  isFetching: boolean;
}

export interface PostsWallActions {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<any, unknown>>;
}

export interface PostsWallHook {
  selectors: PostsWallSelectors;
  actions: PostsWallActions;
}

const fetchPosts = ({ pageParam = 0 }) =>
  HttpRequestService.get(`/post/?cursor=${pageParam}`);

export function usePostsWall(): PostsWallHook {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const {
    data = { pages: [], pageParams: [] },
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery("posts", fetchPosts, {
    getPreviousPageParam: (firstPage) => firstPage.data.lastCursor ?? false,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor ?? false,
  });

  useEffect(() => {
    const posts: PostFormatted[] = [];

    data.pages.forEach((page) => {
      posts.push(...page.data.posts);
    });

    dispatch(loadPosts(posts));
  }, [data]);

  return {
    selectors: { posts, hasNextPage, isFetching },
    actions: { fetchNextPage },
  };
}
