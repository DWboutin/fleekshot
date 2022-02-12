import { useState } from "react";
import { TextFieldTypes } from "../components/TextField";

export interface TextFieldSelectors {
  fieldValue: string;
  fieldType: TextFieldTypes;
  isFocused: boolean;
}

export interface TextFieldActions {
  handleOnFocus: () => void;
  handleOnBlur: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordToggle: () => void;
}

export interface TextFieldHook {
  selectors: TextFieldSelectors;
  actions: TextFieldActions;
}

export function useTextField(
  type: TextFieldTypes,
  defaultValue?: string
): TextFieldHook {
  const [isFocused, setIsFocused] = useState(false);
  const [fieldValue, setFieldValue] = useState(defaultValue || "");
  const [fieldType, setFieldType] = useState<TextFieldTypes>(type);

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value);
  };

  const handlePasswordToggle = () => {
    if (type === "password") {
      if (fieldType === "password") {
        setFieldType("text");
      } else {
        setFieldType("password");
      }
    }
  };

  return {
    selectors: { fieldValue, fieldType, isFocused },
    actions: {
      handleOnFocus,
      handleOnBlur,
      handleOnChange,
      handlePasswordToggle,
    },
  };
}
