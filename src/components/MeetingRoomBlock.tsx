import { Link } from "react-router-dom";
import { H3, P } from "../styles/styled-components/Text";
import { Card } from "../styles/styled-components/Card";
import { Schedule, ScheduleItem } from "../models/Schedule";
import { RoomStatus } from "../models/RoomStatus";
import dayjs from "dayjs";

interface IMeetingRoomBlockProps {
  schedule: Schedule | undefined;
  status: RoomStatus;
  meeting: ScheduleItem | undefined;
}

export const MeetingRoomBlock = (props: IMeetingRoomBlockProps) => {
  if (!props.schedule) {
    return;
  }

  let avaliabilityBgColor: string;
  let roomStatusMsg: string;
  let time: dayjs.Dayjs | undefined;

  switch (props.status) {
    case RoomStatus.available:
      avaliabilityBgColor = "linear-gradient(45deg,#3f705f,#66b397)";
      roomStatusMsg = "Ledig ";
      break;
    case RoomStatus.unavailable:
      avaliabilityBgColor = "linear-gradient(45deg,#871e36,#ba3c59)";
      roomStatusMsg = "Upptagen tills ";
      time = props.meeting?.end.dateTime;
      break;
    case RoomStatus.soonUnavailable:
      avaliabilityBgColor = "linear-gradient(45deg,#b5700d,#f5b65b)";
      roomStatusMsg = "Nästa möte ";
      time = props.meeting?.start.dateTime;

      break;
    default:
      avaliabilityBgColor = "linear-gradient(45deg,#4099ff,#73b4ff)";
      roomStatusMsg = "error ";
      break;
  }

  return (
    <Link
      to={"/meetingroom/" + props.schedule.scheduleId}
      state={{ mail: props.schedule.scheduleId, name: props.schedule.name }}
      style={{ textDecoration: "none" }}
    >
      <Card $inputColor={avaliabilityBgColor}>
        <H3 className="card-title">{props.schedule.name}</H3>
        <P $textColor="#F2F2F2" className="card-content-status">
          {roomStatusMsg}
          {time ? (
            <strong>{time.tz().format("HH:mm")}</strong>
          ) : (
            "resten av dagen"
          )}
        </P>
        <div className="card-content-info">
          <i><P $textColor={"#F2F2F2"}>{props.meeting?.subject}</P></i>
          <p className="card-content-seats">
            {props.schedule.seats}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-person-standing"
              viewBox="4 0 20 18"
            >
              <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0" />
            </svg>
          </p>
        </div>
      </Card>
    </Link>
  );
};
