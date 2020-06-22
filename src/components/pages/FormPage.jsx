import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Faker from "faker";
import { Form } from "../common";
import { useHistory } from "react-router-dom";
export const FormPage = ({ setNewState }) => {
  const history = useHistory();
  console.log("history======", history.location.state);
  const { value, inputs, targetState, intention } = history.location.state;
  const [values, setValue] = useState(value);
  console.log("new value======", values);
  const createdInputs = inputs.reduce(
    (arr, elem) =>
      arr.concat({
        type: "text",
        name: elem,
        value: values[elem],
        onChange: (e) => {
          setValue({ ...values, [elem]: e.target.value });
        },
      }),
    []
  );
  return (
    <div>
      <h1>FormPage</h1>
      <h2>
        Mutate{" "}
        <span>
          <strong>
            <i>{`${targetState}`}</i>
          </strong>
        </span>
      </h2>
      <Form
        submit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setNewState({ targetState, intention, values });
          history.goBack();
        }}
        inputs={createdInputs}
        text={intention}
      ></Form>
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        onClick={() => {
          history.goBack();
        }}
      >
        go back
      </Button>
    </div>
  );
};
