import dayjs from "dayjs";

export class Schedule {
  constructor(
    public name: string,
    public scheduleId: string,
    public availabilityView: string,
    public scheduleItems: ScheduleItem[],
    public workingHours: WorkingHours | undefined,
    public day: dayjs.Dayjs
  ) {}
}

export class ScheduleItem {
  constructor(
    public isPrivate: boolean,
    public status: string,
    public subject: string,
    public location: string,
    public isMeeting: boolean,
    public isRecurring: boolean,
    public isException: boolean,
    public isReminderSet: boolean,
    public start: Time,
    public end: Time
  ) {}
}

export class WorkingHours {
  constructor(
    public daysOfWeek: string[],
    public startTime: dayjs.Dayjs,
    public endTime: dayjs.Dayjs,
  ) {}
}

export class Time {
  constructor(
    public dateTime: dayjs.Dayjs
  ) {}
}
