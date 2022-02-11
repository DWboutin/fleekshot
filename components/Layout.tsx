import type { NextPage } from "next";

import Content from "./Layout/Content";
import Header from "./Layout/Header";

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
