import { Card } from "react-bootstrap";

interface ISingleRoomScheduleBlockProps {
    start: string;
    end: string;
    name: string;
}

export const SingleRoomScheduleBlock = (props: ISingleRoomScheduleBlockProps) => {
    return (
        <Card
        key={props.name}
        text="dark" // dark el white
        style={{
          width: "350px",
          //  height: "90px"
        }}
        className="mb-2"
      >
        <Card.Body>
          <Card.Text>
            {props.start} - {props.end}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
  