import Sidebar from "./components/sidebar";
import SidebarItem from "./components/sidebar-item";
import messageIcon from "./assets/message.svg";
import starIcon from "./assets/star.svg";
import settingsIcon from "./assets/settings.svg";
import profileIcon from "./assets/user.svg";
import usersIcon from "./assets/users.svg";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "./utils/socket";
import { queryClient } from "./router";
import toast from "react-hot-toast";
import infoIcon from "./assets/info.svg";

function App() {
  useEffect(() => {
    if (!socket.connect()) socket.connect();

    function onMessage({
      author,
      content,
    }: {
      author: string;
      content: string;
    }) {
      toast(
        <div className="notification">
          <img src={infoIcon} width={32} height={32} />
          <span>
            <h3>{author}</h3>
            <p>{content}</p>
          </span>
        </div>,
        {
          duration:100000,
          style: {
            backgroundColor: "#313338",
            color: "white",
          },
        },
      );
      queryClient.invalidateQueries();
    }

    socket.on("message:create", onMessage);

    return () => {
      socket.off("message:create", onMessage);
    };
  }, []);

  return (
    <>
      <Sidebar>
        <h1>MA</h1>
        <SidebarItem
          imgSrc={messageIcon}
          itemtext="All messages"
          to="conversations"
        ></SidebarItem>
        <SidebarItem
          imgSrc={starIcon}
          itemtext="Starred"
          to="starred"
        ></SidebarItem>
        <SidebarItem
          imgSrc={profileIcon}
          itemtext="Profle"
          to="profile"
        ></SidebarItem>
        <SidebarItem
          imgSrc={usersIcon}
          itemtext="people"
          to="people"
        ></SidebarItem>
        <SidebarItem
          imgSrc={settingsIcon}
          itemtext="Settings"
          to="settings"
        ></SidebarItem>
      </Sidebar>
      <Outlet></Outlet>
    </>
  );
}

export default App;
