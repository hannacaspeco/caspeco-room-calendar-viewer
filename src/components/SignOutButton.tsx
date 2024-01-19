import { useMsal } from "@azure/msal-react";
import { Button } from "react-bootstrap";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    sessionStorage.removeItem("calendarData");
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
