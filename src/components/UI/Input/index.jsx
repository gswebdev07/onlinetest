import React from "react";
import { InputContainer, InputField } from "./styles";

const index = (props) => {
  const { icon, type, name, placeholder, value, onChange, style } = props;

  return (
    <InputContainer style={style}>
      {icon ? <img alt="icon" src={icon} width="32px" height="auto" /> : null}
      <InputField
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputContainer>
  );
};

export default index;
