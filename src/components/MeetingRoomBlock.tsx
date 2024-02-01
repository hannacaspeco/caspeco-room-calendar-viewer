import { ISchedule } from "../models/IGetScheduleData";
import { Link } from "react-router-dom";
import { getRoomStatus } from "../services/calendarService";
import dayjs from "dayjs";
import { RoomStatus } from "../models/RoomStatus";
import { H3 } from "../styles/styled-components/Text";
import { Card } from "../styles/styled-components/Card";

interface IMeetingRoomBlockProps {
  name: string;
  mail: string;
  schedule: ISchedule | undefined;
}

export const MeetingRoomBlock = (props: IMeetingRoomBlockProps) => {
  if (!props.schedule) {
    return;
  }

  const now = dayjs();

  const [status, time] = getRoomStatus(props.schedule?.scheduleItems, now);

  let avaliabilityBgColor;
  let roomStatusMsg;

  switch (status) {
    case RoomStatus.available:
      avaliabilityBgColor = "linear-gradient(45deg,#17961b,#3cc740)";
      roomStatusMsg = "Ledig ";
      break;
    case RoomStatus.unavailable:
      avaliabilityBgColor = "linear-gradient(45deg,#910106,#e0383e)";
      roomStatusMsg = "Upptagen tills ";
      break;
    case RoomStatus.soonUnavailable:
      avaliabilityBgColor = "linear-gradient(45deg,#db8202,#f5b65b)";
      roomStatusMsg = "Upptagen ";
      break;
    default:
      avaliabilityBgColor = "linear-gradient(45deg,#4099ff,#73b4ff)";
      roomStatusMsg = "error";
      break;
  }

  return (
    <Link
      to={"/meetingroom/" + props.name}
      state={{ mail: props.mail, name: props.name }}
      style={{ textDecoration: "none" }}
    >
      <Card $inputColor={avaliabilityBgColor}>
        <H3>{props.name}</H3>
        {roomStatusMsg}
        {time ? <strong>{time.format("HH:mm")}</strong> : "resten av dagen"}
      </Card>
    </Link>
  );
};
