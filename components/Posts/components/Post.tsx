import Image from "next/image";
import path from "path";
import React from "react";
import styled from "styled-components";
import { UserFormatted } from "../../../server/api/user/dto/UserDTO";
import ImagePaths from "../../../server/services/ImagePaths";
import { ThemeContainer } from "../../../styles/styles";
import { fonts } from "../../../styles/typography";
import AuthorInfo from "./AuthorInfo";

interface ContainerProps {}

const Container = styled.div<ContainerProps>`
  padding: 20px;
  margin-bottom: 20px;
  ${({ theme }: ThemeContainer) => `
    background-color: ${theme.post.bg};
    border: 1px solid ${theme.post.border};
    border-radius: ${theme.post.borderRadius};
  `}
`;

const ImageContainer = styled.div<ContainerProps>`
  position: relative;
  border-radius: ${({ theme }: ThemeContainer) => theme.post.borderRadius};
  overflow: hidden;
  min-height: 300px;
`;

const PostMessage = styled.div<ContainerProps>`
  font-family: ${fonts.text};
  font-weight: 400;
  margin-top: 20px;
  color: ${({ theme }: ThemeContainer) => theme.post.message.color};
`;

interface Props {
  image: string;
  author: UserFormatted;
  message: string;
}

const Post: React.VoidFunctionComponent<Props> = ({
  image,
  author: { name, username, profilePicture },
  message,
}) => {
  return (
    <Container>
      <div>
        <AuthorInfo
          name={name}
          username={username}
          profilePicture={profilePicture as string}
        />
      </div>
      <ImageContainer>
        <Image
          src={path.resolve(ImagePaths.PostPicture, image)}
          alt="Profile picture"
          layout="responsive"
          width="0"
          height="0"
        />
      </ImageContainer>
      <PostMessage>{message}</PostMessage>
    </Container>
  );
};

export default Post;
