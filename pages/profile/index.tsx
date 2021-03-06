import Head from "next/head";

import { NextPageWithLayout } from "../../types/nextPageWithLayout";
import FormContent from "../../components/Layout/components/FormContent";
import { FormattedMessage, useIntl } from "react-intl";
import Title from "../../components/typography/Title";
import UtilsLinks from "../../components/Layout/components/UtilsLinks";
import Layout from "../../components/Layout";
import { ProfileIntlId } from "../../components/Profile/intl/type";
import WithAuthentication from "../../components/AuthManager/components/WithAuthentication";
import ProfilForm from "../../components/Profile/components/ProfilForm";

const Profile: NextPageWithLayout = () => {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>
          {intl.formatMessage({ id: ProfileIntlId.profile_title })} - Fleekshot
        </title>
        <meta
          name="description"
          content={`${intl.formatMessage({
            id: ProfileIntlId.profile_title,
          })} - Fleekshot - Image sharing app`}
        />
      </Head>
      <FormContent>
        <Title>
          <FormattedMessage id={ProfileIntlId.profile_title} />
        </Title>
        <ProfilForm />
      </FormContent>
      <UtilsLinks />
    </>
  );
};

const ProfileWithAuthentication = WithAuthentication(Profile);

ProfileWithAuthentication.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProfileWithAuthentication;
