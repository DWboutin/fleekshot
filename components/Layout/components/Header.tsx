import type { NextPage } from "next";
import Link from "next/link";
import { SyntheticEvent } from "react";
import styled from "styled-components";
import HttpRequestService from "../../../services/HttpRequestService";
import { ThemeContainer } from "../../../styles/styles";
import {
  AuthContextProps,
  useAuthContext,
} from "../../AuthManager/components/AuthManager";
import { useAuthManager } from "../../AuthManager/hooks/useAuthManager";
import Boxicon from "../../BoxIcons/BoxIcons";
import Logo from "./Logo";
import ProfileLink from "./ProfileLink";

const Container = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  height: 60px;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }: ThemeContainer) => theme.header.bg};
  border-bottom: 1px solid ${({ theme }: ThemeContainer) => theme.header.border};
  z-index: 10;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  max-width: 975px;
  padding: 0 20px;
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  a:not(: last-child) {
    color: ${({ theme }: ThemeContainer) => theme.header.link.color};
    margin-right: 10px;

    &:hover {
      color: ${({ theme }: ThemeContainer) => theme.header.link.hoverColor};
    }
  }
`;

const Header: NextPage = () => {
  const { handleLogout } = useAuthContext() as AuthContextProps;
  const handleLogoutClick = async (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const result = await HttpRequestService.get("/user/logout");

    if (result.success) {
      handleLogout();
    }
  };

  return (
    <Container>
      <Content>
        <Logo />
        <Links>
          <Link href="/">
            <a>
              <Boxicon size="small" name="home" />
            </a>
          </Link>
          <Link href="/">
            <a onClick={handleLogoutClick}>
              <Boxicon size="small" name="exit" />
            </a>
          </Link>
          <ProfileLink />
        </Links>
      </Content>
    </Container>
  );
};

export default Header;
