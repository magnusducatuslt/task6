import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

export const ButtonDelete = ({ text, action }) => (
  <Button
    variant="contained"
    color="secondary"
    startIcon={<DeleteIcon />}
    onClick={action}
  >
    {text}
  </Button>
);
