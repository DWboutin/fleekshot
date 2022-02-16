import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { ThemeContainer } from "../../../styles/styles";
import { fonts, fontSizes } from "../../../styles/typography";
import { IntlContextProps, useIntlContext } from "../../IntlManager";
import { IntlLocale } from "../../IntlManager/intl/types";
import { SignInFormIntlId } from "../../SignInForm/intl/type";
import { SignUpFormIntlId } from "../../SignUpForm/intl/type";

interface ContainerProps {}

const Container = styled.div<ContainerProps>`
  text-align: center;

  a,
  button {
    cursor: pointer;
    border: 0;
    padding: 0px;
    background: none;
    font-size: ${fontSizes.small};
    font-family: ${fonts.text};
    color: ${({ theme }: ThemeContainer) => theme.utilsLinks.color};
    text-decoration: underline;
    margin: 4px;

    &:hover {
      color: ${({ theme }: ThemeContainer) => theme.utilsLinks.hoverColor};
    }
  }
`;

interface Props {}

interface UtilLink {
  id: string;
  url: string;
  text: string;
}

const UtilsLinks: React.VoidFunctionComponent<Props> = ({}) => {
  const router = useRouter();
  const { locale, handleLanguageChange } = useIntlContext() as IntlContextProps;
  const links: UtilLink[] = [
    {
      id: "sign-in",
      url: "/account/sign-in",
      text: SignInFormIntlId.signInForm_title,
    },
    {
      id: "sign-up",
      url: "/account/sign-up",
      text: SignUpFormIntlId.signUpForm_title,
    },
    {
      id: "home",
      url: "/",
      text: "home",
    },
  ].filter(({ url }) => url !== router.route);

  const toggleLanguage = () => {
    handleLanguageChange(
      locale === IntlLocale.en ? IntlLocale.fr : IntlLocale.en
    );
  };

  return (
    <Container>
      {links.map(({ id, url, text }) => (
        <Link href={url} key={id}>
          <a>
            <FormattedMessage id={text} />
          </a>
        </Link>
      ))}
      <button type="button" role="button" onClick={toggleLanguage}>
        {locale === IntlLocale.en ? IntlLocale.fr : IntlLocale.en}
      </button>
    </Container>
  );
};

export default UtilsLinks;
