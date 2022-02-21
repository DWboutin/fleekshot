import React, { useRef } from "react";
import styled from "styled-components";
import { useInfiniteQuery } from "react-query";

import HttpRequestService from "../../../services/HttpRequestService";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import Button from "../../forms/Button/Button";
import Post from "./Post";
import { PostFormatted } from "../../../server/api/post/dto/PostDTO";
import { UserFormatted } from "../../../server/api/user/dto/UserDTO";

interface ContainerProps {}

const Container = styled.div<ContainerProps>`
  flex: 1;
`;

const ButtonContainer = styled.div<ContainerProps>`
  display: flex;
  flex: 1;
  justify-content: center;
`;

interface Props {}

const PostsWall: React.VoidFunctionComponent<Props> = ({}) => {
  const fetchPosts = ({ pageParam = 0 }) =>
    HttpRequestService.get(`/post/?cursor=${pageParam}`);

  const loadMoreButtonRef = useRef<HTMLElement>();

  const {
    data = { pages: [], pageParams: [] },
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("posts", fetchPosts, {
    getPreviousPageParam: (firstPage) => firstPage.data.lastCursor ?? false,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor ?? false,
  });

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  return (
    <Container>
      {data.pages.map((page) => (
        <React.Fragment key={page.data.nextCursor}>
          {page.data.posts.map(
            ({ id, image, author, message }: PostFormatted) => (
              <Post
                image={image}
                key={id}
                author={author as UserFormatted}
                message={message}
              />
            )
          )}
        </React.Fragment>
      ))}
      {hasNextPage && (
        <ButtonContainer>
          <Button
            ref={loadMoreButtonRef}
            isLoading={isFetching}
            disabled={isFetching}
          >
            Load more
          </Button>
        </ButtonContainer>
      )}
    </Container>
  );
};

export default PostsWall;
