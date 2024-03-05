import "./styles/styles.scss"
import { Router } from "./Router";
import { RouterProvider } from "react-router-dom";

export default function App() {
  window.location.replace("https://caspecoairdev.z16.web.core.windows.net/");
  return <RouterProvider router={Router} />;
}
