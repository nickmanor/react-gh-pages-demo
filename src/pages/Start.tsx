import { Button, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useQuery } from "react-query";

import { Wrapper } from "./Start.styles";
import { Landing } from "../components/Landing";
import { InfoItem } from "../components/InfoItem";
import { getSession, postCart } from "../services/punchoutService";
import { PhotoSizeSelectLargeTwoTone } from "@mui/icons-material";

export type SessionInfo = {};

export interface ISessionItem {
  id?: string | undefined;
  buyerCookie?: string | undefined;
  userId?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  returnUrl?: string | undefined;
  startDateTime?: Date;  
}

export const StartPage: React.FC = () => {
  const params = useParams();
  const id = params.id;

  const { data, isLoading, isError } = useQuery<ISessionItem>(
    ["sessionInfo", id],
    () => getSession(id!), {staleTime: Infinity}
  );



  if (isLoading || data === null)
    return <div>Loading...</div>;
  if (isError) return <div>ERROR</div>;

  return (
    <Container>
      <Wrapper>
        <Landing />
        <Button
          sx={{ mt: 3 }}
          onClick={() => postCart(id!, data!)}
        >
          Click Here to Test Checkout
        </Button> 
        <div><pre>{JSON.stringify(data, null, 2)}</pre></div>               
      </Wrapper>
    </Container>
  );
};
