import { useMsal } from "@azure/msal-react";
import { Button } from "../styles/styled-components/Button";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    sessionStorage.removeItem("calendarData");
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  return (
    <Button $bgColor="#c41b1b" $textColor="#f2f2f2" onClick={handleLogout}>
      Logga ut
    </Button>
  );
};
