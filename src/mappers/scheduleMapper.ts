import dayjs from "dayjs";
import { ISchedule, IScheduleItem, ITime, IWorkingHours } from "../models/IGetScheduleData";
import { Schedule, ScheduleItem, Time, WorkingHours } from "../models/Schedule";
import { allMeetingRooms } from "../services/calendarService";

export const mapToSchedules = (schedules: ISchedule[], day: dayjs.Dayjs): Schedule[] => {
    return schedules.map((schedule) => mapToSchedule(schedule, day));
}

export const mapToSchedule = (schedule: ISchedule, day: dayjs.Dayjs): Schedule => {
    return new Schedule(
        allMeetingRooms.get(schedule.scheduleId) ?? schedule.scheduleId,
        schedule.scheduleId,
        schedule.availabilityView,
        mapToScheduleItems(schedule.scheduleItems),
        mapToWorkingHours(schedule.workingHours),
        day
    )
}

const mapToWorkingHours = (workingHours: IWorkingHours): WorkingHours | undefined => {
    if (!workingHours) {
        return undefined;
    }

    return new WorkingHours(
        workingHours.daysOfWeek,
        dayjs(workingHours.startTime),
        dayjs(workingHours.endTime),
    )
}

const mapToScheduleItems = (scheduleItems: IScheduleItem[]): ScheduleItem[] => {
    if (!scheduleItems) {
        return [];
    }
    return scheduleItems.map(mapToScheduleItem);
}

const mapToScheduleItem = (scheduleItem: IScheduleItem): ScheduleItem => {
    return new ScheduleItem(
        scheduleItem.isPrivate,
        scheduleItem.status,
        scheduleItem.subject,
        scheduleItem.location,
        scheduleItem.isMeeting,
        scheduleItem.isRecurring,
        scheduleItem.isException,
        scheduleItem.isReminderSet,
        mapToTime(scheduleItem.start),
        mapToTime(scheduleItem.end),
    )
}

const mapToTime = (time: ITime): Time => {
    return new Time(
        dayjs.tz(time.dateTime, time.timeZone)
    )
}
