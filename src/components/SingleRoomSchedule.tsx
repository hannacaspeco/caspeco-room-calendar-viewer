import { useLocation } from "react-router";
import { H1, H2, P } from "../styles/styled-components/Text";
import { SingleRoomScheduleBlock } from "./SingleRoomScheduleBlock";
import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { loginRequest } from "../authConfig";
import { IGetScheduleResponse } from "../models/IGetScheduleData";
import { getSchedule } from "../services/calendarService";
import dayjs from "dayjs";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SingleRoomSchedule = () => {
  const [calendarSchedule, setCalendarSchedule] =
    useState<IGetScheduleResponse>();
  const data = useLocation();
  const { instance, accounts } = useMsal();
  const todaysDate = dayjs(
    calendarSchedule?.value[0].scheduleItems[0].start.dateTime
  ).format("dddd D MMMM");

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

  return (
    <>
      <Link to={"/meetingrooms"}>
        <Button>Gå tillbaka</Button>
      </Link>
      <H2>MÖTESRUM</H2>
      <H1>{data.state.name}</H1>
      <hr />
      <P>{todaysDate}</P>
      {calendarSchedule.value[0].scheduleItems.map((i) => {
        return (
          <SingleRoomScheduleBlock
            start={dayjs(i.start.dateTime).format("HH:mm")}
            end={dayjs(i.end.dateTime).format("HH:mm")}
            name={i.location}
          />
        );
      })}
    </>
  );
};
