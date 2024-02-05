import axios, { AxiosResponse } from "axios";
import {
  IGetScheduleRequest,
  IGetScheduleResponse,
} from "../models/IGetScheduleData";
import { Map } from "immutable";
import dayjs from "dayjs";
import { RoomStatus } from "../models/RoomStatus";
import { Schedule, ScheduleItem } from "../models/Schedule";
import { mapToSchedule, mapToSchedules } from "../mappers/scheduleMapper";

const BASE_URL = "https://graph.microsoft.com/v1.0";

export const allMeetingRooms = Map<string, string>([
  ["allrummet@caspeco.se", "Allrummet"],
  ["room.alvamyrdal@caspeco.se", "Alva Myrdal"],
  ["room.anderscelsius@caspeco.se", "Anders Celsius"],
  ["annamarialenngren@caspeco.se", "Anna Maria Lenngren"],
  ["room.armandduplantis@caspeco.se", "Anna Maria Lenngren"],
  ["barbroalving@caspeco.se", "Barbro Alving"],
  ["room.baren@caspeco.se", "Baren"],
  ["brorhjorth@caspeco.se", "Bror Hjorth"],
  ["room.brunoliljefors@caspeco.se", "Bruno Liljefors"],
  ["carlvonlinne@caspeco.se", "Carl Von Linné"],
  ["room.daghammarskjold@caspeco.se", "Dag Hammarskjöld"],
  ["room.etype@caspeco.se", "E-type"],
  ["room.gunnar.leche@caspeco.se", "Gunnar Leche"],
  ["ingemarbergman@caspeco.se", "Ingemar Bergman"],
  ["room.karinboye@caspeco.se", "Karin Boye"],
  ["room.koket@caspeco.se", "Köket"],
  ["room.magdalenaandersson@caspeco.se", "Magdalena Andersson"],
  ["room.musikrummet@caspeco.se", "Musikrummet"],
  ["owethornqvist@caspeco.se", "Owe Thörnqvist"],
  ["veronicamaggio@caspeco.se", "Veronica Maggio"],
]);

export const getAllSchedules = async (
  accessToken: string
): Promise<Schedule[]> => {
  const today = dayjs().hour(0).minute(0).second(0).millisecond(0);  

  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      schedules: [...allMeetingRooms.keys()],
      // schedules: ["ingemarbergman@caspeco.se"],
      startTime: {
        dateTime: today.hour(6).format("YYYY-MM-DDTHH:mm:ss"),
        timeZone: "UTC",
      },
      endTime: {
        dateTime: today.hour(22).format("YYYY-MM-DDTHH:mm:ss"),
        timeZone: "UTC",
      },
      availabilityViewInterval: 60,
    } as IGetScheduleRequest,
  };

  return axios(BASE_URL + "/me/calendar/getSchedule", requestData)
    .then((response: AxiosResponse<IGetScheduleResponse>) =>
      mapToSchedules(response.data.value, dayjs(today))
    )
    .catch((error) => {
      throw error;
    });
};

export const getSchedule = async (
  accessToken: string,
  mail: string
): Promise<Schedule> => {
  const today = dayjs().hour(0).minute(0).second(0).millisecond(0);  

  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      schedules: [mail],
      startTime: {
        dateTime: today.hour(6).format("YYYY-MM-DDTHH:mm:ss"),
        timeZone: "UTC",
      },
      endTime: {
        dateTime: today.hour(22).format("YYYY-MM-DDTHH:mm:ss"),
        timeZone: "UTC",
      },
      availabilityViewInterval: 60,
    },
  };

  return axios(BASE_URL + "/me/calendar/getSchedule", requestData)
    .then((response) =>
      mapToSchedule(response.data.value[0], dayjs(today))
    )
    .catch((error) => {
      throw error;
    });
};

export const getRoomStatus = (
  scheduleItems: ScheduleItem[] | undefined,
  currentTime: dayjs.Dayjs
): [status: RoomStatus, time: dayjs.Dayjs | undefined] => {
  if (!scheduleItems || scheduleItems.length === 0) {
    return [RoomStatus.available, undefined];
  }

  const meetingInProgress = scheduleItems.find(
    (i) =>
      currentTime.diff(i.start.dateTime) > 0 &&
      currentTime.diff(i.end.dateTime) < 0
  );

  if (meetingInProgress) {
    return [RoomStatus.unavailable, meetingInProgress.end.dateTime];
  }

  const nextMeeting = scheduleItems.find(
    (i) => currentTime.diff(i.start.dateTime) < 0
  );

  if (nextMeeting) {   
    return [RoomStatus.soonUnavailable, nextMeeting.start.dateTime];
  }

  return [RoomStatus.available, undefined];
};
