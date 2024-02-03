import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig.ts";
import { Button } from "react-bootstrap";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    await instance.handleRedirectPromise();
    const accounts = instance.getAllAccounts();
    if (accounts.length === 0) {
      await instance.loginRedirect(loginRequest).catch((e) => {
        throw e;
      });;
    }
  };

  return (
    <Button variant="primary" onClick={handleLogin}>
      Logga in
    </Button>
  );
};
