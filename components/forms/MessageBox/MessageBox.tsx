import React, { ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";
import { ErrorCodes, ErrorMessage } from "../../../server/handler/errorHandler";
import { RequestResponseMessages } from "../../../server/handler/ResponseHandler";
import { HttpErrorsIntlId } from "../../../services/intl/type";
import { ThemeContainer } from "../../../styles/styles";
import { toREM } from "../../../styles/typography";
import Boxicon from "../../BoxIcons/BoxIcons";

export enum MessageBoxStatus {
  success = "success",
  error = "error",
}

interface ContainerProps extends ThemeContainer {
  status: MessageBoxStatus;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex: 1;
  padding: 8px;
  font-size: ${toREM(12)};
  margin-top: 10px;

  ${({ theme, status }: ContainerProps) => `
    border-radius: ${theme.forms.button.borderRadius};
    background-color: ${
      status === MessageBoxStatus.error
        ? theme.forms.errorColor
        : theme.forms.successColor
    };
    color: white;
  `}

  &>.bx {
    margin-right: 5px;
  }

  & > div {
    display: inline-block;
    padding-top: 1px;

    & > div:not(:last-child) {
      margin-bottom: 5px;
    }
  }
`;

interface Props {
  isRequested: boolean;
  isSuccesful: boolean;
  errorCode: ErrorCodes | null;
  messages: RequestResponseMessages[] | null;
}

const MessageBox: React.VoidFunctionComponent<Props> = ({
  isRequested,
  isSuccesful,
  errorCode,
  messages,
}) => {
  const intl = useIntl();

  if (!isRequested) return null;

  const status = isSuccesful
    ? MessageBoxStatus.success
    : MessageBoxStatus.error;

  return (
    <Container status={status}>
      <Boxicon
        name={status === MessageBoxStatus.error ? "x-circle" : "check-circle"}
      />
      <div>
        {messages &&
          messages.map(({ field, value, message }) => {
            const fieldKey = `httpErrors_field_${field}`;

            if ((!errorCode || !field) && message) {
              return (
                <FormattedMessage tagName="div" id={message} key={message} />
              );
            }

            return (
              <FormattedMessage
                tagName="div"
                key={`httpErrors_${errorCode}_${field}_${message}`}
                id={`httpErrors_${errorCode}`}
                values={{
                  field: intl
                    .formatMessage({
                      id: fieldKey,
                    })
                    .toLowerCase(),
                  value,
                  message:
                    message !== null
                      ? intl.formatMessage({ id: message }).toLowerCase()
                      : "",
                }}
              />
            );
          })}
      </div>
    </Container>
  );
};

export default MessageBox;
