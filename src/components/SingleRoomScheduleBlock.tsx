import { Card } from "react-bootstrap";

interface ISingleRoomScheduleBlockProps {
    start: string;
    end: string;
    name: string;
    booker: string;
}

export const SingleRoomScheduleBlock = (props: ISingleRoomScheduleBlockProps) => {
    return (
        <Card
        key={props.name}
        text="dark" // dark el white
        border="#4472C4"
        style={{
          // width: "350px",
          //  height: "90px"
        }}
        className="mb-2"
      >
        <Card.Body>
        <Card.Title>
          {props.start} - {props.end}
        </Card.Title>
          <Card.Text>
            Bokad av: <i>{props.booker}</i>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
  