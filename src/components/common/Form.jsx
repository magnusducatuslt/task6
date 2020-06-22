import React from "react";
import TextField from "@material-ui/core/TextField";
import { ButtonSubmit } from "./ButtonSubmit";
export const Form = ({ inputs, text, submit }) => {
  return (
    <form onSubmit={submit}>
      {inputs.map((input, index) => (
        <TextField
          style={{ margin: "1rem" }}
          key={`${Date.now()}/${index}/${input.name}`}
          label={input.name}
          variant="outlined"
          value={input.value}
          type={input.type}
          onChange={input.onChange}
        />
      ))}
      <ButtonSubmit text={text} />
    </form>
  );
};
