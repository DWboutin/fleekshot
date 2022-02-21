import { useFormik } from "formik";
import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import HttpRequestService from "../../../services/HttpRequestService";
import userAvatarSchema from "../../../validations/userAvatarSchema";
import {
  AuthContextProps,
  useAuthContext,
} from "../../AuthManager/components/AuthManager";
import UploadField from "../../forms/UploadField/UploadField";
import { ProfileIntlId } from "../intl/type";
import ProfilePicture, {
  Container as ProfilePictureContainer,
} from "./ProfilePicture";

interface ContainerProps {
  enctype: string;
}

const Form = styled.form<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${ProfilePictureContainer} {
    margin-bottom: 20px;
  }
`;

interface Props {}

const ProfilPictureForm: React.VoidFunctionComponent<Props> = ({}) => {
  const intl = useIntl();
  const { user, fetchSession } = useAuthContext() as AuthContextProps;
  const { handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      avatar: "",
    },
    validationSchema: userAvatarSchema,
    onSubmit: async (values) => {
      const result = await HttpRequestService.upload(
        "/user/avatar",
        {
          avatar: values.avatar[0],
        },
        {
          userId: user?.id,
        }
      );

      if (result.data.id) {
        fetchSession();
      }
    },
  });

  const handleFileChange = (values: File[]) => {
    setFieldValue("avatar", values);
    handleSubmit();
  };

  return (
    <Form enctype="multipart/form-data">
      <ProfilePicture />
      <UploadField
        inputName="avatar"
        handleChange={handleFileChange}
        buttonLabel={intl.formatMessage({
          id: ProfileIntlId.profile_uploadPicture,
        })}
      />
    </Form>
  );
};

export default ProfilPictureForm;
