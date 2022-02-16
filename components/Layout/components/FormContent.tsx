import styled from "styled-components";

import { ThemeContainer } from "../../../styles/styles";

const FormContent = styled.div`
  padding: 20px;
  ${({ theme }: ThemeContainer) => `
    background-color: ${theme.forms.container.bg};
    border: 1px solid ${theme.forms.container.border};
    border-radius: ${theme.forms.container.borderRadius};
  `}
  margin-bottom: 20px;
`;

export default FormContent;
