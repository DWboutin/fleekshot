import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { ThemeContainer } from "../../../styles/styles";
import ProfilePicture, {
  ProfilPictureSize,
} from "../../Profile/components/ProfilePicture";

interface ContainerProps {}

const StyledLink = styled.a<ContainerProps>`
  cursor: pointer;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }: ThemeContainer) => theme.header.profile.bg};
`;

interface Props {}

const ProfileLink: React.VoidFunctionComponent<Props> = ({}) => {
  return (
    <Link href="/profile/">
      <StyledLink>
        <ProfilePicture size={ProfilPictureSize.small} />
      </StyledLink>
    </Link>
  );
};

export default ProfileLink;
