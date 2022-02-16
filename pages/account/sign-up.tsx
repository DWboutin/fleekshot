import Head from "next/head";
import { NextPageWithLayout } from "../../types/nextPageWithLayout";
import LayoutSignForm from "../../components/LayoutSignForm";
import FormContent from "../../components/Layout/components/FormContent";
import SignUpForm from "../../components/SignUpForm/components/SignUpForm";
import { FormattedMessage } from "react-intl";
import Title from "../../components/typography/Title";
import { SignUpFormIntlId } from "../../components/SignUpForm/intl/type";
import UtilsLinks from "../../components/Layout/components/UtilsLinks";

const SignUp: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Fleekshot</title>
        <meta name="description" content="Generated by create next app" />
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
