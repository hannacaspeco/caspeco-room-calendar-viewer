import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig.ts";
import { Button } from "react-bootstrap";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    await instance.handleRedirectPromise();
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
  };

  return (
    <Button variant="primary" onClick={handleLogin}>
      Logga in
    </Button>
  );
};
