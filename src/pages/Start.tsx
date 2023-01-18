import { Button, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";

import { Wrapper } from "./Start.styles";
import { Landing } from "../components/Landing";
import { InfoItem } from "../components/InfoItem";
import { getSession, saveCart, getCart } from "../services/punchoutService";
import { CartItems } from "../types/CartTypes";

export type SessionInfo = {};

export const StartPage: React.FC = () => {
  const params = useParams();
  const id = params.id;

  //const [cartData, setCart] = useState<CartItems>({} as CartItems);

  const { data, isLoading, isError } = useQuery<string[]>(
    ["sessionInfo", id],
    () => getSession(id!)
  );

  const { data: cartData, isLoading: cartIsLoading } = useQuery<CartItems>(
    ["cartData", id],
    () => getCart(id!),
    { placeholderData: { items: [] } }
  );

  const cartMutation = useMutation((cartData: CartItems) => {
    return saveCart(id!, cartData);
  });

  console.log("cd", cartData);

  if (isLoading || cartIsLoading || cartData === null || data === null)
    return <div>Loading...</div>;
  if (isError) return <div>ERROR</div>;

  return (
    <Container>
      <Wrapper>
        <Landing />
        {data!.map((value, i) => (
          <InfoItem key={i} info={value} />
        ))}{" "}
        <Button
          onClick={() => {
            cartMutation.mutate({
              items: [
                {
                  productCode: "123456",
                  qty: cartData ? cartData.items[0].qty + 1 : 1,
                },
              ],
            });
          }}
          sx={{ mt: 3 }}
        >
          Button To Somewhere....
        </Button>
        {cartData!.items.map((value, i) => (
          <p key={i}>
            {value.productCode}:{value.qty}
          </p>
        ))}
      </Wrapper>
    </Container>
  );
};
