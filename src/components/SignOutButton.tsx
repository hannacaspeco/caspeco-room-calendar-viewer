import { useMsal } from "@azure/msal-react";
import { Button } from "../styles/styled-components/Button";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    sessionStorage.removeItem("calendarData");
    instance.logoutRedirect({
      postLogoutRedirectUri: "/caspeco-room-calendar-viewer",
    });
  };

  return (
    <Button $bgColor="#964557" $textColor="#f2f2f2" onClick={handleLogout}>
      Logga ut
    </Button>
  );
};
