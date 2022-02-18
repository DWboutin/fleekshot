import { IncomingMessage, ServerResponse } from "http";
import { NextPage, NextPageContext } from "next";
import React, { ReactNode, useEffect } from "react";

import { UserFormatted } from "../../../server/api/user/dto/UserDTO";
import HttpRequestService from "../../../services/HttpRequestService";
import { NextPageWithLayout } from "../../../types/nextPageWithLayout";
import { AuthContextProps, useAuthContext } from "./AuthManager";

interface Props {
  children: ReactNode;
  isAuthenticated: boolean;
  user?: UserFormatted;
}

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

const WithAuthentication: (
  WrappedComponent: NextPage | NextPageWithLayout
) => NextPageWithLayout = (WrappedComponent) => {
  const WithAuth: React.FunctionComponent<Props> = (props) => {
    const { isAuthenticated, handleAuth, fetchSession } =
      useAuthContext() as AuthContextProps;

    useEffect(() => {
      if (!isAuthenticated) {
        fetchSession();
      }

      if (props.isAuthenticated) {
        handleAuth(props.user as UserFormatted);
      }
    }, [props]);

    return <WrappedComponent {...props} />;
  };

  WithAuth.getInitialProps = ({ res, req }: NextPageContextSession) => {
    if (req && !req?.session.user) {
      res.redirect("/account/sign-in");
    }

    return {
      isAuthenticated: !!req?.session.user,
      user: req?.session.user,
    };
  };

  return WithAuth;
};

export default WithAuthentication;
