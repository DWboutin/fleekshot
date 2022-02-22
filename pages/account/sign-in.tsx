import Head from "next/head";
import { FormattedMessage, useIntl } from "react-intl";

import { NextPageWithLayout } from "../../types/nextPageWithLayout";
import LayoutSignForm from "../../components/LayoutSignForm";
import FormContent from "../../components/Layout/components/FormContent";
import SignInForm from "../../components/SignInForm/components/SignInForm";
import { SignInFormIntlId } from "../../components/SignInForm/intl/type";
import Title from "../../components/typography/Title";
import UtilsLinks from "../../components/Layout/components/UtilsLinks";

const SignIn: NextPageWithLayout = () => {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>
          {intl.formatMessage({ id: SignInFormIntlId.signInForm_title })} -
          Fleekshot
        </title>
        <meta
          name="description"
          content={`${intl.formatMessage({
            id: SignInFormIntlId.signInForm_title,
          })} - Fleekshot - Image sharing app`}
        />
      </Head>
      <FormContent>
        <Title>
          <FormattedMessage id={SignInFormIntlId.signInForm_title} />
        </Title>
        <SignInForm />
      </FormContent>
      <UtilsLinks />
    </>
  );
};

SignIn.getLayout = function getLayout(page) {
  return <LayoutSignForm>{page}</LayoutSignForm>;
};

export default SignIn;
