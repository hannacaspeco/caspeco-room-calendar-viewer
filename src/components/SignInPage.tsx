import Navbar from "react-bootstrap/Navbar";
import { SignInButton } from "./SignInButton.tsx";
import { H1, P } from "../styles/styled-components/Text.tsx";
import { Stack } from "react-bootstrap";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignOutButton } from "./SignOutButton.tsx";
import { Link } from "react-router-dom";
import { Button } from "../styles/styled-components/Button.tsx";

export const SignInPage = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Stack gap={3}>
      <Navbar className="nav-bar">
        <H1>Caspeco Room Calendar Viewer</H1>
      </Navbar>

      <center>
        {!isAuthenticated ? (
          <>
            <P>Logga in för att se mötesrum för Caspeco Uppsala</P>
            <SignInButton />
          </>
        ) : (
          <>
            <P>Du är inloggad!</P>
            <Link to={"/meetingrooms"}>
              <Button $bgColor="#566BB3" $textColor="#f2f2f2">
                Gå till mötesrum
              </Button>
            </Link>
            <SignOutButton />
          </>
        )}
      </center>
    </Stack>
  );
};
