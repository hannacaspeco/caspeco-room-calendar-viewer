import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { SignOutButton } from "./SignOutButton";
import { Container } from "react-bootstrap";
import { allMeetingRooms, getAllSchedules } from "../services/calendarService";
import { useEffect, useState } from "react";
import { MeetingRoomBlock } from "./MeetingRoomBlock";
import { IGetScheduleResponse } from "../models/IGetScheduleData";

export const MeetingRooms = () => {
  const { instance, accounts } = useMsal();
  const [calendarSchedules, setCalendarSchedules] =
    useState<IGetScheduleResponse>();

  useEffect(() => {
    async function getCalendarSchedules() {
      if (calendarSchedules) {
        return;
      }

      await instance.initialize();
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          getAllSchedules(response.accessToken).then((response) => {
            setCalendarSchedules(response);
          });
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }
    getCalendarSchedules();
  }, [accounts, calendarSchedules, instance]);

  return (
    <Container>
      MeetingRooms
      <SignOutButton />
      <hr />
      {allMeetingRooms
        .map((roomMail, roomName) => {
          return (
            <MeetingRoomBlock
              name={roomName}
              schedule={calendarSchedules?.value.find(
                (s) => s.scheduleId === roomMail
              )}
            />
          );
        })
        .valueSeq()}
    </Container>
  );
};
