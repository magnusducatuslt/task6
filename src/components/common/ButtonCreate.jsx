import React from "react";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
export const ButtonCreate = ({ onClick, text }) => (
  <Button
    variant="contained"
    color="primary"
    size="large"
    startIcon={<SendIcon />}
    onClick={onClick}
  >
    {text}
  </Button>
);
