import { Button, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useQuery } from "react-query";

import { Wrapper } from "./Start.styles";
import { Landing } from "../components/Landing";
import { InfoItem } from "../components/InfoItem";

export type SessionInfo = {};

export const StartPage: React.FC = () => {
  const params = useParams();
  const id = params.id;

  const [sessionInfo, setSessionInfo] = useState("");

  const { data, isLoading, error } = useQuery<string[]>(
    ["sessionInfo", id],
    () => getSession(id!)
  );

  const getSession = (id: string) => {
    return fetch(
      `https://ulfpunchoutdev.azurewebsites.net/punchout/get-punch/${id}`
    ).then((data) => data.json());
  };

  return isLoading || data === null ? (
    <div>Loading...</div>
  ) : (
    <Container>
      <Wrapper>
        <Landing />
        {data!.map((value, i) => (
          <InfoItem key={i} info={value} />
        ))}{" "}
        <Button sx={{ mt: 3 }}>Button To Somewhere....</Button>
      </Wrapper>
    </Container>
  );
};
