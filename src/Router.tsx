import { createHashRouter } from "react-router-dom";
import { SignInPage } from "./components/SignInPage";
import { MeetingRooms } from "./components/MeetingRooms";
import { SingleRoomSchedule } from "./components/SingleRoomSchedule";

export const Router = createHashRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/meetingrooms",
    element: <MeetingRooms />,
  },
  {
    path: "/meetingroom/:id",
    element: <SingleRoomSchedule />,
  },
]);
