import { useLocation } from "react-router";
import { H1, H2, P } from "../styles/styled-components/Text";
import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { loginRequest } from "../authConfig";
import { IGetScheduleResponse } from "../models/IGetScheduleData";
import { getSchedule } from "../services/calendarService";
import dayjs from "dayjs";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SignOutButton } from "./SignOutButton";
import { DayCalendar } from "./DayCalendar";

export const SingleRoomSchedule = () => {
  const [calendarSchedule, setCalendarSchedule] =
    useState<IGetScheduleResponse>();
  const data = useLocation();
  const { instance, accounts } = useMsal();

  useEffect(() => {
    async function getCalendarSchedule() {
      if (calendarSchedule) {
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
              setCalendarSchedule(response);
            }
          );
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }
    getCalendarSchedule();
  }, [accounts, calendarSchedule, data.state.mail, instance]);

  if (!calendarSchedule) {
    return <></>;
  }

  const today = dayjs();

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
      <P>{today.format("dddd D MMMM")}</P>
      <hr />
      <div>
        <DayCalendar
          scheduleItems={calendarSchedule.value[0].scheduleItems}
          today={today}
        />
      </div>
    </div>
  );
};
