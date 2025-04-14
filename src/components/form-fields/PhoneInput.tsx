"use client";

import { TextField, TextFieldProps } from "@mui/material";
import "cleave.js/dist/addons/cleave-phone.ru";
import Cleave from "cleave.js/react";
import { forwardRef, useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CleaveInput = forwardRef(({ ...props }: any, ref) => {
  const { inputRef, ...other } = props;

  return (
    <Cleave
      {...other}
      placeholder="+7 (___) ___-__-__"
      options={{
        phone: true,
        phoneRegionCode: "RU",
        prefix: "+7 9",
        noImmediatePrefix: true,
        delimiter: " ",
        blocks: [2, 3, 3, 2, 2],
        numericOnly: true,
      }}
      value={other.value ?? ""}
      ref={inputRef ?? ref}
    />
  );
});

CleaveInput.displayName = "CleaveInput"; // Set display name

interface IPhoneInput<T extends FieldValues> extends Omit<TextFieldProps, "name"> {
  register?: UseFormRegister<T>;
  name?: Path<T>;
}

const PhoneInput = <T extends FieldValues>(props: IPhoneInput<T>) => {
  const { value, register, name, ...restProps } = props;

  /* Если пропсами не пришла функция register и название поля (name) формы,
		то привязка поля к форме осуществляться не будет
	*/
  const registerObject = register && name ? register(name) : {};
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <TextField
      name={name}
      {...restProps}
      {...registerObject}
      value={value}
      InputProps={{
        inputComponent: CleaveInput,
      }}
      onFocus={handleFocus}
      InputLabelProps={{
        shrink: isFocused,
      }}
    />
  );
};

export default PhoneInput;
