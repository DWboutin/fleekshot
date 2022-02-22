import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostFormatted } from "../../../server/api/post/dto/PostDTO";
import type { RootState } from "../../../store/";

interface PostsState {
  posts: PostFormatted[];
}

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    loadPosts: (state, action: PayloadAction<PostFormatted[]>) => {
      state.posts = action.payload;
    },
    prependPost: (state, action: PayloadAction<PostFormatted>) => {
      state.posts = [action.payload, ...state.posts];
    },
  },
});

export const { prependPost, loadPosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
