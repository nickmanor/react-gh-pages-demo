import axios from "axios";
import { CartItems } from "../types/CartTypes";

const api = axios.create({
  //baseURL: "https://ulfpunchoutdev.azurewebsites.net/punchout",
  baseURL: "https://test.ulfweb.com/punchout",
});

export const getSession = async (id: string) => {
  const { data } = await api.get(`session/${id}/session`);

  console.log("SessionData", data);

  return data;
};

export const saveCart = async (id: string, items: CartItems) => {
  console.log("Save Cart Items", items);

  api.put(`/cart/${id}`, items);
};

export const getCart = async (id: string): Promise<CartItems> => {
  console.log("Get Cart Items");

  const { data } = await api.get(`/cart/${id}`);
  return data;
};
