import { useLocation } from "react-router-dom";

export const NotFound = () => {
  const local = useLocation();

  return (
    <div>
      404: <code>{local.pathname}</code> is not the page you are looking for.
    </div>
  );
};
