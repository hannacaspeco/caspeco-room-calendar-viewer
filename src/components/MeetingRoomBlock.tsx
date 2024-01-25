import { Card } from "react-bootstrap";
import { ISchedule } from "../models/IGetScheduleData";

interface IMeetingRoomBlockProps {
    name: string;
    schedule: ISchedule | undefined;
}

export const MeetingRoomBlock = (props: IMeetingRoomBlockProps) => {
    return (
        <Card
        bg="secondary"
        key={props.name}
        text='light' // el dark eller white
        style={{ width: '350px', height: "90px" }}
        className="mb-2 text-center"
        border="secondary"
      >
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
          </Card.Text>
        </Card.Body>
      </Card>
    );
}