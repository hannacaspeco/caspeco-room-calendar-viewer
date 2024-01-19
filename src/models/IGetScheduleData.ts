export interface IGetScheduleRequest {
    schedules: string[];
    startTime: ITime;
    endTime: ITime;
    availabilityViewInterval: number;
  }
  

export interface IGetScheduleResponse {
  "@odata.context": string;
  value: IValue[];
}

interface IValue {
  scheduleId: string;
  availabilityView: string;
  scheduleItems: IScheduleItem[];
  workingHours: IWorkingHours;
}

interface IScheduleItem {
  isPrivate: boolean;
  status: string;
  subject: string;
  location: string;
  isMeeting: boolean;
  isRecurring: boolean;
  isException: boolean;
  isReminderSet: boolean;
  start: ITime;
  end: ITime;
}

export interface ITime {
  dateTime: string;
  timeZone: string;
}

interface IWorkingHours {
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
  timeZone: ITimeZone;
}

interface ITimeZone {
  name: string;
}
