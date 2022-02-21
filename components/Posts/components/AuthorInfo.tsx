import Image from "next/image";
import path from "path";
import React from "react";
import styled from "styled-components";
import ImagePaths from "../../../server/services/ImagePaths";
import { ThemeContainer } from "../../../styles/styles";
import { fonts } from "../../../styles/typography";

interface ContainerProps {}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const AuthorImageContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }: ThemeContainer) => theme.post.author.imageBg};
`;

const AuthorProfile = styled.div<ContainerProps>`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
`;

const AuthorUsername = styled.div<ContainerProps>`
  font-family: ${fonts.text};
  font-weight: 600;
  color: ${({ theme }: ThemeContainer) => theme.post.author.usernameColor};
  margin-right: 10px;
`;

const AuthorName = styled.div<ContainerProps>`
  font-family: ${fonts.text};
  font-weight: 400;
  color: ${({ theme }: ThemeContainer) => theme.post.author.nameColor};
`;

interface Props {
  name: string;
  username: string;
  profilePicture: string;
}

const AuthorInfo: React.VoidFunctionComponent<Props> = ({
  name,
  username,
  profilePicture,
}) => {
  return (
    <Container>
      <AuthorImageContainer>
        <Image
          src={path.resolve(ImagePaths.MinifiedProfilePicture, profilePicture)}
          alt="Profile picture"
          layout="responsive"
          width="400"
          height="400"
        />
      </AuthorImageContainer>
      <AuthorProfile>
        <AuthorUsername>@{username}</AuthorUsername>
        <AuthorName>{name}</AuthorName>
      </AuthorProfile>
    </Container>
  );
};

export default AuthorInfo;
