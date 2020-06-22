import React from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

export const ButtonSubmit = ({ text }) => (
  <Button
    variant="contained"
    color="primary"
    size="large"
    startIcon={<SaveIcon />}
    type="submit"
  >
    {text}
  </Button>
);
