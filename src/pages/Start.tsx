import { Button, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useQuery } from "react-query";

import { Wrapper } from "./Start.styles";
import { Landing } from "../components/Landing";
import { InfoItem } from "../components/InfoItem";
import { getSession } from "../services/punchoutService";

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
    () => getSession(id!)
  );

  if (isLoading || data === null)
    return <div>Loading...</div>;
  if (isError) return <div>ERROR</div>;

  return (
    <Container>
      <Wrapper>
        <Landing />
        <div><pre>{JSON.stringify(data, null, 2)}</pre></div>
        
        {/* <Button
          onClick={() => {
            cartMutation.mutate({
              items: [
                {
                  productCode: "123456",
                  qty: cartData!.items.length ? cartData!.items[0].qty + 1 : 1,
                },
              ],
            });
          }}
          sx={{ mt: 3 }}
        >
          Button To Somewhere....
        </Button> */}        
      </Wrapper>
    </Container>
  );
};
