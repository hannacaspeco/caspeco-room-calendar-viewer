import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { SignOutButton } from "./SignOutButton";
import { Button } from "react-bootstrap";
import { getAllRoomsSchedule } from "../services/calendarService";

export const MeetingRooms = () => {
  const { instance, accounts } = useMsal();

  const showSchedule = async () => {
    sessionStorage.removeItem("calendarData");
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        getAllRoomsSchedule(response.accessToken).then((response) => {
          sessionStorage.setItem("calendarData", JSON.stringify(response));
        }
        );
      });
  }

  const calendarDataFromStorage = sessionStorage.getItem("calendarData")

  return (
    <>
      MeetingRooms
      <SignOutButton />
      <hr />
      <Button onClick={showSchedule}>Visa mötesrummens schema för idag</Button>
      <p>{calendarDataFromStorage}</p>
      <hr/>
    </>
  );
};
