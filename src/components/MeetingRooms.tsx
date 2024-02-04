import "../styles/styles.scss";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { SignOutButton } from "./SignOutButton";
import {
  Button,
  Col,
  Container,
  Row,
  Image,
  ButtonGroup,
  Modal,
} from "react-bootstrap";
import { allMeetingRooms, getAllSchedules } from "../services/calendarService";
import { useEffect, useState } from "react";
import { MeetingRoomBlock } from "./MeetingRoomBlock";
import { Schedule } from "../models/Schedule";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);

export const MeetingRooms = () => {
  const { instance, accounts } = useMsal();
  const [calendarSchedules, setCalendarSchedules] = useState<Schedule[]>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function getCalendarSchedules() {
      if (calendarSchedules) {
        return;
      }

      await instance.initialize();
      await instance.handleRedirectPromise();
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          getAllSchedules(response.accessToken).then((response) => {
            setCalendarSchedules(response);
          });
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }
    getCalendarSchedules();
  }, [accounts, calendarSchedules, instance]);

  return (
    <Container style={{ maxWidth: "700px" }}>
      <Row className="ps-2 pe-2">
        <Col className="text-end p-4">
          <ButtonGroup>
            <Button variant="secondary" onClick={() => setShow(true)}>
              Visa karta över kontoret
            </Button>
            <SignOutButton />
          </ButtonGroup>
        </Col>
      </Row>

      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Karta över kontoret</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src="/caspeco-room-calendar-viewer/karta_over_kontoret.png"
            width={1200}
          />
        </Modal.Body>
      </Modal>

      <Row className="justify-content-md-center px-3">
        <Col>
          {allMeetingRooms
            .sort()
            .map((roomMail, roomName) => {
              return (
                <MeetingRoomBlock
                  name={roomName}
                  mail={roomMail}
                  schedule={calendarSchedules?.find(
                    (s) => s.scheduleId === roomMail
                  )}
                />
              );
            })
            .valueSeq()}
        </Col>
      </Row>
    </Container>
  );
};
