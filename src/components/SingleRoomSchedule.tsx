import { useLocation, useNavigate } from "react-router";
import { H1, H2, P } from "../styles/styled-components/Text";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { loginRequest } from "../authConfig";
import { getSchedule } from "../services/calendarService";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SignOutButton } from "./SignOutButton";
import { DayCalendar } from "./DayCalendar";
import { Schedule } from "../models/Schedule";
import { Button } from "../styles/styled-components/Button";

export const SingleRoomSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule>();
  const data = useLocation();
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
    
    async function effectAsync() {
      if (schedule) {
        return;
      }

      await instance.initialize();
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          getSchedule(response.accessToken, data.state.mail).then(
            (response) => {
              setSchedule(response);
            }
          );
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }
    effectAsync();
  }, [accounts, schedule, data.state.mail, instance]);

  if (!schedule) {
    return <></>;
  }

  return (
    <Container className="p-4 schedule-container">
      <Row className="ps-2 pe-2">
        <Col className="text-end p-4">
          <Link to={"/meetingrooms"}>
            <Button $bgColor="#4472C4" $textColor="#f2f2f2">Gå tillbaka</Button>
          </Link>
          <SignOutButton />
        </Col>
      </Row>

      <div className="text-center">
        <H2>SCHEMA</H2>
        <H1>{data.state.name}</H1>
      </div>
      <P $textColor="#000">{schedule.day.format("dddd D MMMM")}</P>
      <div>
        <DayCalendar
          scheduleItems={schedule.scheduleItems}
          day={schedule.day}
        />
      </div>
    </Container>
  );
};
