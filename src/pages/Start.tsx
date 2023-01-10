import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const StartPage = () => {
  const params = useParams();
  const id = params.id;

  return (
    <Container>
      <img></img>
      <Typography variant="h3" component="h3">
        If you can read this, you've made it through the login process.
      </Typography>

      <Typography variant="h4" component="h4">
        {id}
      </Typography>
    </Container>
  );
};
