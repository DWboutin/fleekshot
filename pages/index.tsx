import Head from "next/head";
import styled from "styled-components";
import WithAuthentication from "../components/AuthManager/components/WithAuthentication";
import Layout from "../components/Layout";
import UtilsLinks from "../components/Layout/components/UtilsLinks";
import PostForm from "../components/PostForm/components/PostForm";
import PostsWall from "../components/Posts/components/PostsWall";
import { NextPageWithLayout } from "../types/nextPageWithLayout";

const HomeContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const PostWallColumn = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
`;

const SideColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Fleekshot</title>
        <meta name="description" content="Fleekshot - Image sharing app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContent>
        <PostWallColumn>
          <PostForm />
          <PostsWall />
        </PostWallColumn>
        <SideColumn>
          <UtilsLinks />
        </SideColumn>
      </HomeContent>
    </>
  );
};

const HomeWithAuthentication = WithAuthentication(Home);

HomeWithAuthentication.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default HomeWithAuthentication;
