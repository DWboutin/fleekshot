import Head from "next/head";
import { FormattedMessage, useIntl } from "react-intl";

import { NextPageWithLayout } from "../../types/nextPageWithLayout";
import LayoutSignForm from "../../components/LayoutSignForm";
import FormContent from "../../components/Layout/components/FormContent";
import SignUpForm from "../../components/SignUpForm/components/SignUpForm";
import Title from "../../components/typography/Title";
import { SignUpFormIntlId } from "../../components/SignUpForm/intl/type";
import UtilsLinks from "../../components/Layout/components/UtilsLinks";

const SignUp: NextPageWithLayout = () => {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>
          {intl.formatMessage({ id: SignUpFormIntlId.signUpForm_title })} -
          Fleekshot
        </title>
        <meta
          name="description"
          content={`${intl.formatMessage({
            id: SignUpFormIntlId.signUpForm_title,
          })} - Fleekshot - Image sharing app`}
        />
      </Head>
      <FormContent>
        <Title>
          <FormattedMessage id={SignUpFormIntlId.signUpForm_title} />
        </Title>
        <SignUpForm />
      </FormContent>
      <UtilsLinks />
    </>
  );
};

SignUp.getLayout = function getLayout(page) {
  return <LayoutSignForm>{page}</LayoutSignForm>;
};

export default SignUp;
