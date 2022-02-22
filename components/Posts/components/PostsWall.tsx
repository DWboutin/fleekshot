import React, { useRef } from "react";
import styled from "styled-components";
import { useInfiniteQuery } from "react-query";

import HttpRequestService from "../../../services/HttpRequestService";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import Button from "../../forms/Button/Button";
import Post from "./Post";
import { PostFormatted } from "../../../server/api/post/dto/PostDTO";
import { UserFormatted } from "../../../server/api/user/dto/UserDTO";
import { usePostsWall } from "../hooks/usePostsWall";

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
  const {
    selectors: { posts, hasNextPage, isFetching },
    actions: { fetchNextPage },
  } = usePostsWall();
  const loadMoreButtonRef = useRef<HTMLElement>();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  return (
    <Container>
      {posts.map(({ id, image, author, message }: PostFormatted) => (
        <Post
          image={image}
          key={id}
          author={author as UserFormatted}
          message={message}
        />
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
