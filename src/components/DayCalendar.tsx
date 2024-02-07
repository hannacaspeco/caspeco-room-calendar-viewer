import { Calendar, DateLocalizer, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/sass/styles.scss";
import "../styles/customCalendar.scss"
import { ScheduleItem } from "../models/Schedule";

const localizer = dayjsLocalizer(dayjs);
const formats = {
  timeGutterFormat: "HH:mm",
  eventTimeRangeFormat: (
    range: { start: Date; end: Date },
    _culture: string | undefined,
    localizer: DateLocalizer | undefined
  ) => {
    if (!localizer) {
      return "error";
    }

    return (
      localizer.format(range.start, "HH:mm") +
      " - " +
      localizer.format(range.end, "HH:mm")
    );
  },
};

interface IDayCalendarProps {
  scheduleItems: ScheduleItem[];
  day: dayjs.Dayjs;
}

export const DayCalendar = (props: IDayCalendarProps) => {
  const events = props.scheduleItems.map((i) => {
    return {
      start: i.start.dateTime.toDate(),
      end: i.end.dateTime.toDate(),
      title: i.subject,
    };
  });

  return (
    <Calendar
      culture="sv-SE"
      formats={formats}
      min={new Date(props.day.year(), props.day.month(), props.day.date(), 7)}
      max={new Date(props.day.year(), props.day.month(), props.day.date(), 21)}
      defaultDate={props.day.toDate()}
      defaultView="day"
      views={["day"]}
      toolbar={false}
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
    />
  );
};
