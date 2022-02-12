import { VoidFunctionComponent } from "react";
import classNames from "classnames";

export type BoxiconTypes = "regular" | "solid" | "logo";
export type BoxiconSizes = "xsmall" | "small" | "medium" | "large";
export type BoxiconRotations = "90" | "180" | "270";
export type BoxiconFlips = "horizontal" | "vertical";
export type BoxiconPulls = "left" | "right";
export type BoxiconAnimations =
  | "spin"
  | "tada"
  | "flashing"
  | "burst"
  | "fade-left"
  | "fade-right"
  | "fade-up"
  | "fade-down";

export interface Props {
  name: string;
  type?: BoxiconTypes;
  size?: BoxiconSizes;
  rotate?: BoxiconRotations;
  flip?: BoxiconFlips;
  pull?: BoxiconPulls;
  animation?: BoxiconAnimations;
  fixedWidth?: boolean;
  bordered?: boolean;
  circle?: boolean;
  animationOnHover?: boolean;
  className?: string;
}

const typePrefix = {
  regular: "bx",
  solid: "bxs",
  logo: "bxl",
};

const sizeSuffix = {
  xsmall: "xs",
  small: "sm",
  medium: "md",
  large: "lg",
};

const Boxicon: VoidFunctionComponent<Props> = ({
  name,
  type = "regular",
  size = "xsmall",
  rotate,
  flip,
  fixedWidth,
  pull,
  bordered,
  circle,
  animation,
  animationOnHover,
  className,
}) => {
  const classes = classNames({
    bx: true,
    [`${typePrefix[type]}-${name}`]: true,
    [`bx-${sizeSuffix[size]}`]: true,
    [`bx-rotate-${rotate}`]: rotate,
    [`bx-flip-${flip}`]: flip,
    "bx-fw": fixedWidth,
    "bx-border": bordered && !circle,
    "bx-border-circle": bordered && circle,
    [`bx-${animation}`]: animation && !animationOnHover,
    [`bx-${animation}-hover`]: animation && animationOnHover,
    [`bx-pull-${pull}`]: pull,
    className,
  });

  return <i className={classes} />;
};

export default Boxicon;
