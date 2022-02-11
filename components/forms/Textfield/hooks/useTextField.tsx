import { useState } from "react";

export interface TextFieldSelectors {
  value: string;
  isFocused: boolean;
}

export interface TextFieldActions {
  handleOnFocus: () => void;
  handleOnBlur: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextFieldHook {
  selectors: TextFieldSelectors;
  actions: TextFieldActions;
}

export function useTextField(): TextFieldHook {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleOnFocus = () => {
    setIsFocused(true);
  };
  const handleOnBlur = () => {
    setIsFocused(false);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    selectors: { value, isFocused },
    actions: {
      handleOnFocus,
      handleOnBlur,
      handleOnChange,
    },
  };
}
