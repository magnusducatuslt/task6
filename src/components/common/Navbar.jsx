import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
export const NavBar = ({ links }) => (
  <AppBar position="static">
    <Toolbar>
      {links.map((link, index) => (
        <Typography
          variant="h6"
          key={`${Date.now()}/${index}`}
          style={{ flexGrow: 1 }}
        >
          <Link to={link.to} style={{ textDecorationLine: "none" }}>
            {link.text}
          </Link>
        </Typography>
      ))}
    </Toolbar>
  </AppBar>
);
