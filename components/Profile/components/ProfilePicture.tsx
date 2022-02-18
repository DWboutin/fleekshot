import Image from "next/image";
import path from "path";
import React from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../../styles/styles";
import { useAuthContext } from "../../AuthManager/components/AuthManager";

interface ContainerProps extends ThemeContainer {
  size: ProfilPictureSize;
}

export const Container = styled.div<ContainerProps>`
  cursor: pointer;
  width: ${({ size }: ContainerProps) => `${size}px`};
  height: ${({ size }: ContainerProps) => `${size}px`};
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }: ContainerProps) => theme.header.profile.bg};
`;

export enum ProfilPictureSize {
  small = 24,
  big = 150,
}

interface Props {
  size?: ProfilPictureSize;
}

const baseProfilePicturePath = "/uploads/user/resized";

const ProfilePicture: React.VoidFunctionComponent<Props> = ({
  size = ProfilPictureSize.big,
}) => {
  const { user } = useAuthContext();

  return (
    <Container size={size}>
      {user?.profilePicture && (
        <Image
          src={path.resolve(baseProfilePicturePath, user.profilePicture)}
          alt="Profile picture"
          width={size}
          height={size}
        />
      )}
    </Container>
  );
};

export default ProfilePicture;
