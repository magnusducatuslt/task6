import React from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

export const Submit = ({ text }) => (
  <Button
    variant="contained"
    color="primary"
    size="small"
    startIcon={<SaveIcon />}
    type="submit"
  >
    {text}
  </Button>
);
