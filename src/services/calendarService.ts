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
  ["Allrummet", "allrummet@caspeco.se"],
  ["Alva Myrdal", "room.alvamyrdal@caspeco.se"],
  ["Anders Celsius", "room.anderscelsius@caspeco.se"],
  ["Anna Maria Lenngren", "annamarialenngren@caspeco.se"],
  ["Armand Duplantis", "room.armandduplantis@caspeco.se"],
  ["Barbro Alving", "barbroalving@caspeco.se"],
  ["Baren", "room.baren@caspeco.se"],
  ["Bror Hjorth", "brorhjorth@caspeco.se"],
  ["Bruno Liljefors", "room.brunoliljefors@caspeco.se"],
  ["Carl Von Linné", "carlvonlinne@caspeco.se"],
  ["Dag Hammarskjöld", "room.daghammarskjold@caspeco.se"],
  ["E-type", "room.etype@caspeco.se"],
  ["Gunnar Leche", "room.gunnar.leche@caspeco.se"],
  ["Ingemar Bergman", "ingemarbergman@caspeco.se"],
  ["Karin Boye", "room.karinboye@caspeco.se"],
  ["Köket", "room.koket@caspeco.se"],
  ["Magdalena Andersson", "room.magdalenaandersson@caspeco.se"],
  ["Musikrummet", "room.musikrummet@caspeco.se"],
  ["Owe Thörnqvist", "owethornqvist@caspeco.se"],
  ["Veronica Maggio", "veronicamaggio@caspeco.se"],
]);

export const getAllSchedules = async (
  accessToken: string
): Promise<Schedule[]> => {
  const today = dayjs().date(2).hour(0).minute(0).second(0).millisecond(0);  

  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      schedules: [...allMeetingRooms.values()],
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
  const today = dayjs().date(2).hour(0).minute(0).second(0).millisecond(0);  

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
