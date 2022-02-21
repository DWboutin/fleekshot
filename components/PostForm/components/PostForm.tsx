import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";
import { useFormik } from "formik";

import { ThemeContainer } from "../../../styles/styles";
import TextField, {
  Container as TextFieldContainer,
} from "../../forms/Textfield/components/TextField";
import Button, {
  Container as ButtonContainer,
} from "../../forms/Button/Button";
import postCreationSchema from "../../../validations/postCreationSchema";
import UploadField from "../../forms/UploadField/UploadField";
import { PostFormIntlId } from "../intl/type";
import FormContent from "../../Layout/components/FormContent";
import Image from "next/image";
import { usePostForm } from "../hooks/usePostForm";

interface ContainerProps {
  enctype: string;
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form<ContainerProps>`
  display: flex;
  flex-direction: row;

  ${TextFieldContainer} {
    flex: 0;
    margin-right: 10px;
    margin-bottom: ${({ theme }: ThemeContainer) =>
      theme.forms.container.fieldMarginBottom};
  }

  ${Column} {
    &:first-child {
      flex: 1;
    }
  }

  ${ButtonContainer} {
    height: 38px;
    margin-bottom: ${({ theme }: ThemeContainer) =>
      theme.forms.container.fieldMarginBottom};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: ${({ theme }: ThemeContainer) => theme.post.borderRadius};
  overflow: hidden;
  min-height: 300px;
  margin-right: 10px;
`;

const ImageErrorContainer = styled.div`
  color: ${({ theme }: ThemeContainer) => theme.forms.errorColor};
`;

interface Props {}

const PostForm: React.VoidFunctionComponent<Props> = ({}) => {
  const intl = useIntl();
  const {
    selectors: { isCreating, localImage },
    actions: { handleFormSubmit, setLocalImage },
  } = usePostForm();

  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        image: null,
        message: "",
      },
      validationSchema: postCreationSchema,
      onSubmit: ({ image, message }, actions) => {
        handleFormSubmit(image, { message }, () => {
          actions.resetForm({
            image: null,
            message: "",
          });
        });
      },
    });

  const handleFileChange = (values: File[]) => {
    setLocalImage(URL.createObjectURL(values[0]) as string);
    setFieldValue("image", values[0]);
  };

  return (
    <FormContent>
      <Form onSubmit={handleSubmit} enctype="multipart/form-data">
        <Column>
          <TextField
            id="message"
            name="message"
            type="text"
            value={values.message}
            onChange={handleChange}
            label={intl.formatMessage({
              id: PostFormIntlId.postForm_inputLabel,
            })}
            error={touched.message && errors.message}
          />
          {localImage && (
            <ImageContainer>
              <Image
                src={localImage}
                alt="Post picture"
                layout="responsive"
                width="0"
                height="0"
              />
            </ImageContainer>
          )}
          {!localImage && errors.image && (
            <ImageErrorContainer>
              <FormattedMessage id={errors.image} />
            </ImageErrorContainer>
          )}
        </Column>
        <Column>
          <UploadField
            inputName="image"
            handleChange={handleFileChange}
            buttonLabel={intl.formatMessage({
              id: PostFormIntlId.postForm_uploadImage,
            })}
          />
          <Button type="submit" disabled={isCreating} isLoading={isCreating}>
            <FormattedMessage id={PostFormIntlId.postForm_share} />
          </Button>
        </Column>
      </Form>
    </FormContent>
  );
};

export default PostForm;
