import type { NextPage } from "next";
import styled from "styled-components";
import { fonts, toREM } from "../../../styles/typography";

const Container = styled.div`
  font-family: ${fonts.logo};
  font-size: ${toREM(24)};
`;

const Logo: NextPage = () => {
  return <Container>Fleekshot</Container>;
};

export default Logo;
