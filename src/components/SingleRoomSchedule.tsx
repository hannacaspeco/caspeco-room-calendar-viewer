import { useLocation } from "react-router";
import { H1, H2, P } from "../styles/styled-components/Text";
import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { loginRequest } from "../authConfig";
import { getSchedule } from "../services/calendarService";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SignOutButton } from "./SignOutButton";
import { DayCalendar } from "./DayCalendar";
import { Schedule } from "../models/Schedule";

export const SingleRoomSchedule = () => {
  const [schedule, setSchedule] =
    useState<Schedule>();
  const data = useLocation();
  const { instance, accounts } = useMsal();

  useEffect(() => {
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
    <div className="p-2">
      <Row className="ps-2 pe-2">
        <Col className="text-start p-4">
          <Link to={"/meetingrooms"}>
            <Button>Gå tillbaka</Button>
          </Link>
        </Col>
        <Col className="text-end p-4">
          <SignOutButton />
        </Col>
      </Row>

      <div className="text-center" style={{ color: "#4472C4" }}>
        <H2>SCHEMA</H2>
        <H1>{data.state.name}</H1>
      </div>
      <P>{schedule.day.format("dddd D MMMM")}</P>
      <hr />
      <div>
        <DayCalendar
          scheduleItems={schedule.scheduleItems}
          day={schedule.day}
        />
      </div>
    </div>
  );
};
