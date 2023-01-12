import Typography from "@mui/material/Typography";
import React from "react";

type Props = {
  info: string;
};

export const InfoItem: React.FC<Props> = ({ info }) => (
  <>
    <Typography mt={2} variant="h5" component="h5">
      {info}
    </Typography>
  </>
);
