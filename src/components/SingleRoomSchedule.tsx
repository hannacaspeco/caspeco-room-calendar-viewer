import { useLocation } from "react-router";
import { H1, H2, P } from "../styles/styled-components/Text";
import { SingleRoomScheduleBlock } from "./SingleRoomScheduleBlock";
import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { loginRequest } from "../authConfig";
import { IGetScheduleResponse } from "../models/IGetScheduleData";
import { getSchedule } from "../services/calendarService";
import dayjs from "dayjs";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SignOutButton } from "./SignOutButton";

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

  console.log("cal sched_ ", calendarSchedule);
  

  if (!calendarSchedule) {   
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
      <P>{dayjs().format("dddd D MMMM")}</P>
      <hr />
      <div>
        
        {calendarSchedule.value[0].scheduleItems.map((i) => {
          return (
            <SingleRoomScheduleBlock
              start={dayjs(i.start.dateTime).format("HH:mm")}
              end={dayjs(i.end.dateTime).format("HH:mm")}
              name={i.location}
              booker={i.subject}
            />
          );
        })}
      </div>
    </div>
  );
};
