import type { NextPage } from "next";
import styled from "styled-components";
import { ThemeContainer } from "../../../styles/styles";
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
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  max-width: 975px;
  padding: 0 20px;
`;

const Header: NextPage = () => {
  return (
    <Container>
      <Content>
        <Logo />
        <ProfileLink />
      </Content>
    </Container>
  );
};

export default Header;
