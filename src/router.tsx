import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from ".";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Chatarea from "./pages/chat-area";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App></App>,

    children: [
      {
        index: true,
        element: <Navigate to={"conversations"}></Navigate>,
      },
      {
        path: "conversations",
        element: <Chatarea></Chatarea>,
      },
      {
        path: "starred",
        element: <h1>Soon</h1>,
      },
      {
        path: "profile",
        element: <h1>Soon</h1>,
      },
      {
        path: "people",
        element: <h1>Soon</h1>,
      },
      {
        path: "settings",
        element: <h1>Soon</h1>,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/signin",
    element: <Signin></Signin>,
  },
  {
    path: "/forgot-password",
    element: <Navigate to={"/signin"}></Navigate>,
  },
];

const router = createBrowserRouter(routes);
export { router };
