import { Button, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React from "react";

import logo from "../ulf_logotype_knockout.png";
import { Wrapper } from "./Start.styles";

export const StartPage = () => {
  const params = useParams();
  const id = params.id;

  return (
    <Container>
      <Wrapper>
        <img src={logo}></img>
        <Typography variant="h3" component="h3">
          You've made it through the login process!
        </Typography>

        <Typography mt={2} variant="h5" component="h5">
          {id}
        </Typography>
        <Button sx={{ mt: 3 }}>Button To Somewhere....</Button>
      </Wrapper>
    </Container>
  );
};
