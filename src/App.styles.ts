import styled from "styled-components";
import { styled as styledM } from "@mui/material/styles";

export const Offset = styledM("div")(({ theme }) => theme.mixins.toolbar);

export const Wrapper = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
`;
