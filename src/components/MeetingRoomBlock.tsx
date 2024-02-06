import { Link } from "react-router-dom";
import { H3 } from "../styles/styled-components/Text";
import { Card } from "../styles/styled-components/Card";
import { Schedule } from "../models/Schedule";
import { RoomStatus } from "../models/RoomStatus";
import dayjs from "dayjs";

interface IMeetingRoomBlockProps {
  schedule: Schedule | undefined;
  status: RoomStatus;
  time: dayjs.Dayjs | undefined;
}

export const MeetingRoomBlock = (props: IMeetingRoomBlockProps) => {
  if (!props.schedule) {
    return;
  }

  let avaliabilityBgColor: string;
  let roomStatusMsg: string;

  switch (props.status) {
    case RoomStatus.available:
      avaliabilityBgColor = "linear-gradient(45deg,#3f705f,#66b397)";
      roomStatusMsg = "Ledig ";
      break;
    case RoomStatus.unavailable:
      avaliabilityBgColor = "linear-gradient(45deg,#871e36,#ba3c59)";
      roomStatusMsg = "Upptagen tills ";
      break;
    case RoomStatus.soonUnavailable:
      avaliabilityBgColor = "linear-gradient(45deg,#b5700d,#f5b65b)";
      roomStatusMsg = "Upptagen ";
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
        <H3>{props.schedule.name}</H3>
        {roomStatusMsg}
        {props.time ? <strong>{props.time.tz().format("HH:mm")}</strong> : "resten av dagen"}
      </Card>
    </Link>
  );
};
