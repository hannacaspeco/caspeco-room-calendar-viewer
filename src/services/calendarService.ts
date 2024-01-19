import axios from "axios";
import { IGetScheduleRequest } from "../models/IGetScheduleData";

const BASE_URL = "https://graph.microsoft.com/v1.0";
const allMeetingRooms = [
  "allrummet@caspeco.se",
  "room.alvamyrdal@caspeco.se",
  "room.anderscelsius@caspeco.se",
  "annamarialenngren@caspeco.se",
  "room.armandduplantis@caspeco.se",
  "barbroalving@caspeco.se",
  "room.baren@caspeco.se",
  "brorhjorth@caspeco.se",
  "room.brunoliljefors@caspeco.se",
  "carlvonlinne@caspeco.se",
  "room.daghammarskjold@caspeco.se",
  "room.etype@caspeco.se",
  "room.gunnar.leche@caspeco.se",
  "ingemarbergman@caspeco.se",
  "room.karinboye@caspeco.se",
  "room.koket@caspeco.se",
  "room.magdalenaandersson@caspeco.se",
  "room.musikrummet@caspeco.se",
  "owethornqvist@caspeco.se",
  "veronicamaggio@caspeco.se",
];

const now = new Date();
const dd = String(now.getDate()).padStart(2, '0');
const mm = String(now.getMonth() + 1).padStart(2, '0');
const yyyy = now.getFullYear();
const todaysDate = yyyy + "-" + mm + '-' + dd;

export const getAllRoomsSchedule =  async (accessToken: string) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      schedules: allMeetingRooms,
      startTime: {
        dateTime: todaysDate + "T09:00:00",
        timeZone: "Pacific Standard Time",
      },
      endTime: {
        dateTime: todaysDate + "T17:00:00",
        timeZone: "Pacific Standard Time",
      },
      availabilityViewInterval: 60,
    } as IGetScheduleRequest
  };

  return axios(BASE_URL + "/me/calendar/getSchedule", options)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}


export const getSingleRoomSchedule =  async (accessToken: string, meetingRoom: string) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      schedules: meetingRoom,
      startTime: {
        dateTime: todaysDate + "T09:00:00",
        timeZone: "Pacific Standard Time",
      },
      endTime: {
        dateTime: todaysDate + "T17:00:00",
        timeZone: "Pacific Standard Time",
      },
      availabilityViewInterval: 60,
    }
  };

  return axios(BASE_URL + "/me/calendar/getSchedule", options)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
