import React, { useRef } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import Button from "../../forms/Button/Button";

interface ContainerProps {}

const Container = styled.div<ContainerProps>`
  input {
    display: none;
  }
`;

interface Props {
  buttonLabel: string;
  inputName: string;
  handleChange: (values: File[]) => void;
}

const UploadField: React.VoidFunctionComponent<Props> = ({
  buttonLabel,
  inputName,
  handleChange,
}) => {
  const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    handleChange([e.target.files[0]]);
  };

  return (
    <Container>
      <Button type="button" onClick={handleFileInputClick}>
        {buttonLabel}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        name={inputName}
        onChange={handleFileChange}
      />
    </Container>
  );
};

export default UploadField;
