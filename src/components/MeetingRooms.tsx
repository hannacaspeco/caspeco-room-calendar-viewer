import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { SignOutButton } from "./SignOutButton";
import {
  Button,
  Col,
  Container,
  Row,
  Image,
  Modal,
  Spinner,
} from "react-bootstrap";
import { getAllSchedules, getRoomStatus } from "../services/calendarService";
import { useEffect, useState } from "react";
import { MeetingRoomBlock } from "./MeetingRoomBlock";
import { Schedule } from "../models/Schedule";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { BiSortAZ, BiSortDown } from "react-icons/bi";
import { SortOrder } from "../models/SortOrder";
import * as SC from "../styles/styled-components/Button";
import { RoomStatus } from "../models/RoomStatus";
import { useNavigate } from "react-router";

dayjs.extend(utc);
dayjs.extend(timezone);

export const MeetingRooms = () => {
  const { instance, accounts } = useMsal();
  const [schedules, setSchedules] = useState<Schedule[]>();
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.availability);
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/")
  }

  useEffect(() => {
    async function effectAsync() {
      if (schedules) {
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
            setSchedules(response);
          });
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }
    effectAsync();
  }, [accounts, schedules, instance]);

  const now = dayjs();
  const schedulesData = schedules?.map((schedule) => {
    return {
      schedule,
      status: getRoomStatus(schedule.scheduleItems, now),
    };
  });

  if (sortOrder === SortOrder.alphabetically) {
    schedulesData?.sort((a, b) =>
      a.schedule.name.localeCompare(b.schedule.name)
    );
  } else if (sortOrder === SortOrder.availability) {
    schedulesData?.sort((a, b) => {
      if (a.status[0] !== b.status[0]) {
        return a.status[0] - b.status[0];
      }
      if (!a.status[1] && !b.status[1]) {
        return a.schedule.name.localeCompare(b.schedule.name);
      }
      if (a.status[0] === RoomStatus.unavailable) {
        return (a.status[1] ?? dayjs()).diff(b.status[1]);
      }
      return (b.status[1] ?? dayjs()).diff(a.status[1]);
    });
  }

  return (
    <Container className="custom-container">
      <Row className="ps-2 pe-2">
        <Col className="text-end p-4">
          <SC.Button $bgColor="#4472C4" $textColor="#F2F2F2" onClick={() => setShowModal(true)}>Visa karta över kontoret</SC.Button>
          <SignOutButton />
        </Col>
      </Row>

      <Row className="p-1">
        <Col className="text-start p-1 ps-4">
          <Button
            variant="light"
            onClick={() => setSortOrder(SortOrder.alphabetically)}
            active={sortOrder === SortOrder.alphabetically}
          >
            <BiSortAZ />
          </Button>
          <Button
            variant="light"
            onClick={() => setSortOrder(SortOrder.availability)}
            active={sortOrder === SortOrder.availability}
          >
            <BiSortDown />
          </Button>
        </Col>
      </Row>

      <Modal
        show={showModal}
        fullscreen={true}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Karta över kontoret</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src="/caspeco-room-calendar-viewer/karta_over_kontoret.png"
            alt="karta över kontoret"
            className="window-width"
          />
        </Modal.Body>
      </Modal>

      <Row className="justify-content-md-center px-3">
        <Col>
          {schedulesData ? (
            <>
              {schedulesData.map((data) => {
                return (
                  <MeetingRoomBlock
                    schedule={data.schedule}
                    status={data.status[0]}
                    time={data.status[1]}
                  />
                );
              })}
            </>
          ) : (
            <Spinner
              animation="border"
              role="status"
              className="p-4 spinner"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Col>
      </Row>
    </Container>
  );
};
