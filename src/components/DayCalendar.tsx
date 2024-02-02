/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, DateLocalizer, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IScheduleItem } from "../models/IGetScheduleData";

const localizer = dayjsLocalizer(dayjs);
const formats = {
   timeGutterFormat: "HH:mm",
   eventTimeRangeFormat: (range: any, culture: string | undefined, localizer: DateLocalizer | undefined) => {
    if (!localizer) {
        return "error"
    }
    return localizer.format(range.start, "HH:mm") + " - " + localizer.format(range.end, "HH:mm")
   }
};

interface IDayCalendarProps {
  scheduleItems: IScheduleItem[];
  today: dayjs.Dayjs;
}


export const DayCalendar = (props: IDayCalendarProps) => {
  const events = props.scheduleItems.map((i) => {
    return {
      start: dayjs(i.start.dateTime).toDate(),
      end: dayjs(i.end.dateTime).toDate(),
      title: i.subject,
    };
  });

  return (
    <Calendar
      culture="sv-SE"
      formats={formats}
      min={
        new Date(props.today.year(), props.today.month(), props.today.date(), 7)
      }
      max={
        new Date(
          props.today.year(),
          props.today.month(),
          props.today.date(),
          21
        )
      }
      defaultDate={props.today.toDate()}
      defaultView="day"
      views={["day"]}
      toolbar={false}
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      //style={{ padding: "20px" }}
    />
  );
};
