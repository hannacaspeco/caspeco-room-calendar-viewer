import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig.ts";
import { Button } from "../styles/styled-components/Button.tsx";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    await instance.handleRedirectPromise();
    const accounts = instance.getAllAccounts();
    if (accounts.length === 0) {
      await instance.loginRedirect(loginRequest).catch((e) => {
        throw e;
      });
    }
  };

  return (
    <Button $bgColor="#566bb3" $textColor="#f2f2f2" onClick={handleLogin}>
    Logga in
  </Button>
  );
};
