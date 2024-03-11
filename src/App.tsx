import "./styles/styles.scss"
import { Router } from "./Router";
import { RouterProvider } from "react-router-dom";

export default function App() {
  window.location.replace("https://rooms.caspeco.net/");
  return <RouterProvider router={Router} />;
}
