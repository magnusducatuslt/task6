import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Joi from "@hapi/joi";
import { Form } from "../common";
import { useHistory } from "react-router-dom";
export const FormPage = ({ setNewState }) => {
  const history = useHistory();
  console.log("history======", history.location.state);
  const { value, inputs, targetState, intention } = history.location.state;
  const [values, setValue] = useState(value);
  const [errorsTitle, setErrorTitile] = useState("");
  console.log("new value======", values);
  let schema = {};
  for (const val in value) {
    schema[val] = Joi.string().min(1).max(20).required();
  }
  const createdInputs = inputs.reduce((arr, elem) => {
    return arr.concat({
      type: "text",
      name: elem,
      value: values[elem],
      onChange: (e) => {
        setValue({ ...values, [elem]: e.target.value });
      },
    });
  }, []);
  schema = Joi.object(schema);
  return (
    <div>
      <h1>FormPage</h1>
      <h2>
        Mutate
        <span>
          <strong>
            <i>{` ${targetState} `}</i>
          </strong>
          {` ${errorsTitle}`}
        </span>
      </h2>
      <Form
        submit={async (e) => {
          try {
            e.preventDefault();
            e.stopPropagation();
            const result = await schema.validateAsync(values);
            setNewState({ targetState, intention, values });
            history.goBack();
          } catch (e) {
            setErrorTitile(e);
          }
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
