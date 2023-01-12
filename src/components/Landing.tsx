import Typography from "@mui/material/Typography";
import React from "react";
import logo from "../ulf_logotype_knockout.png";

export const Landing = () => (
  <>
    <img src={logo}></img>
    <Typography variant="h3" component="h3">
      You've made it through the login process!
    </Typography>
  </>
);
