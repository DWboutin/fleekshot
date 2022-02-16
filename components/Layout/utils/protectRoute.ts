import { IncomingMessage, ServerResponse } from "http";
import { NextPage, NextPageContext } from "next";
import { NextPageWithLayout } from "../../../types/nextPageWithLayout";
import { useAuthContext } from "../../AuthManager";

interface ReqSession extends IncomingMessage {
  session: {
    user: any;
  };
}
interface ResSession extends ServerResponse {
  redirect: (uri: string) => void;
}

interface NextPageContextSession extends NextPageContext {
  req: ReqSession;
  res: ResSession;
}

const protectRoute = (component: NextPage | NextPageWithLayout) => {
  component.getInitialProps = ({ res, req }: NextPageContextSession) => {
    if (req && !req?.session.user) {
      res.redirect("/account/sign-in");
    }

    return {
      isAuthenticated: req?.session.user,
    };
  };

  return component;
};

export default protectRoute;
