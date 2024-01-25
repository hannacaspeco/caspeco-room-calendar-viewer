import axios from "axios";
import { IGetScheduleRequest } from "../models/IGetScheduleData";
import { Map } from "immutable";

const BASE_URL = "https://graph.microsoft.com/v1.0";

export const allMeetingRooms = Map<string, string>([
  [ "Allrummet", "allrummet@caspeco.se" ],
  [ "Alva Myrdal", "room.alvamyrdal@caspeco.se" ],
  [ "Anders Celsius", "room.anderscelsius@caspeco.se" ],
  [ "Anna Maria Lenngren", "annamarialenngren@caspeco.se" ],
  [ "Armand Duplantis", "room.armandduplantis@caspeco.se" ],
  [ "Barbro Alving", "barbroalving@caspeco.se" ],
  [ "Baren", "room.baren@caspeco.se" ],
  [ "Bror Hjorth", "brorhjorth@caspeco.se" ],
  [ "Bruno Liljefors", "room.brunoliljefors@caspeco.se" ],
  [ "Carl Von Linné", "carlvonlinne@caspeco.se" ],
  [ "Dag Hammarskjöld", "room.daghammarskjold@caspeco.se" ],
  [ "E-type", "room.etype@caspeco.se" ],
  [ "Gunnar Leche", "room.gunnar.leche@caspeco.se" ],
  [ "Ingemar Bergmar", "ingemarbergman@caspeco.se" ],
  [ "Karin Boye", "room.karinboye@caspeco.se" ],
  [ "Köket", "room.koket@caspeco.se" ],
  [ "Magdalena Andersson", "room.magdalenaandersson@caspeco.se" ],
  [ "Musikrummet", "room.musikrummet@caspeco.se" ],
  [ "Owe Thörnqvist", "owethornqvist@caspeco.se" ],
  [ "Veronica Maggio", "veronicamaggio@caspeco.se" ],
]);

const now = new Date();
const dd = String(now.getDate()).padStart(2, "0");
const mm = String(now.getMonth() + 1).padStart(2, "0");
const yyyy = now.getFullYear();
const todaysDate = yyyy + "-" + mm + "-" + dd;

export const getAllSchedules = async (accessToken: string) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      schedules: [...allMeetingRooms.values()],
      startTime: {
        dateTime: todaysDate + "T06:00:00",
        timeZone: "UTC",
      },
      endTime: {
        dateTime: todaysDate + "T22:00:00",
        timeZone: "UTC",
      },
      availabilityViewInterval: 60,
    } as IGetScheduleRequest,
  };

  return axios(BASE_URL + "/me/calendar/getSchedule", options)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const getSchedule = async (
  accessToken: string,
  mail: string
) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      schedules: [mail],
      startTime: {
        dateTime: todaysDate + "T06:00:00",
        timeZone: "UTC",
      },
      endTime: {
        dateTime: todaysDate + "T22:00:00",
        timeZone: "UTC",
      },
      availabilityViewInterval: 60,
    },
  };

  return axios(BASE_URL + "/me/calendar/getSchedule", options)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
