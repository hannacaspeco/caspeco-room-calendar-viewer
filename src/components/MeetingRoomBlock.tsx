import { Card } from "react-bootstrap";
import { ISchedule } from "../models/IGetScheduleData";
import { Link } from "react-router-dom";
import { getRoomStatus } from "../services/calendarService";
import dayjs from "dayjs";
import { RoomStatus } from "../models/RoomStatus";

interface IMeetingRoomBlockProps {
  name: string;
  schedule: ISchedule | undefined;
}

export const MeetingRoomBlock = (props: IMeetingRoomBlockProps) => {
  // days.js format: 2020-04-02T08:02:17-05:00
  //from API:        2024-01-26T08:15:00.0000000

  if (!props.schedule) {
    return;
  }

  const now = dayjs();

  const [status, time] = getRoomStatus(props.schedule?.scheduleItems, now);
  console.log("time ", time);
  console.log("dayjs ", dayjs());

  let avaliabilityBgColor;
  let roomStatusMsg;

  switch (status) {
    case RoomStatus.available:
      avaliabilityBgColor = "success";
      roomStatusMsg = "Ledig ";
      break;
    case RoomStatus.unavailable:
      avaliabilityBgColor = "danger";
      roomStatusMsg = "Upptagen tills ";
      break;
    case RoomStatus.soonUnavailable:
      avaliabilityBgColor = "warning";
      roomStatusMsg = "Upptagen ";
      break;
    default:
      avaliabilityBgColor = "info";
      roomStatusMsg = "error";
      break;
  }

  return (
    // <Link to={"/meetingroom/" + props.name}>
    <Card
      bg={avaliabilityBgColor}
      border={avaliabilityBgColor}
      key={props.name}
      text="dark" // dark el white
      style={{
        width: "350px",
        //  height: "90px"
      }}
      className="mb-2 text-center"
    >
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {/* {JSON.stringify(props.schedule?.scheduleItems)} */}
          {/* <hr /> */}
          {roomStatusMsg}
          {time ? <strong>{time.format("HH:mm")}</strong> : "resten av dagen"}
        </Card.Text>
      </Card.Body>
    </Card>
    // </Link>
  );
};
