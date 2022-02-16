import type { NextPage } from "next";

import Content from "./Layout/components/Content";
import Header from "./Layout/components/Header";

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
