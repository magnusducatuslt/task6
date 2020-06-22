import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
export const FormPage = (setNewState) => {
  const history = useHistory();
  console.log(history.location.state);

  return (
    <div>
      <h1>FormPage</h1>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          history.goBack();
        }}
      >
        go back
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setNewState();
        }}
      ></Button>
    </div>
  );
};
