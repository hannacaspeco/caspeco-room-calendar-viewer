import { useMsal } from "@azure/msal-react";
import { Button } from "react-bootstrap";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Logga ut
    </Button>
  );
};
