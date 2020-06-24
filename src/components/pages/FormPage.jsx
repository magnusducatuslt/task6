import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Joi from "@hapi/joi";
import { connect } from "react-redux";
import { createOneRecord, updateOneRecord } from "@store";

import { Form } from "../common";
import { useHistory } from "react-router-dom";
const FormPage = ({ createOneRecord, updateOneRecord }) => {
  const history = useHistory();
  const { value, inputs, targetState, intention } = history.location.state;
  const [values, setValue] = useState(value);
  const [errorsTitle, setErrorTitile] = useState("");
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
            await schema.validateAsync(values);
            if (intention === "update") {
              updateOneRecord({ target: targetState, body: values });
            } else {
              createOneRecord({ target: targetState, body: values });
            }

            //setNewState({ targetState, intention, values });
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

const mapStateToProps = ({
  recordsReducer: { people, starships, planets },
}) => {
  return { people, starships, planets };
};
const mapDispatchToProps = { createOneRecord, updateOneRecord };
export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
