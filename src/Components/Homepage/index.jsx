import { useState } from "react";
import { Input, Select, Button } from "antd";
import "./style.css";
import Notification from "./Notification";
import ManagementVideo from "./ManagementVideo";

function HomePage() {
  return (
    <>
      <Notification />
      <ManagementVideo />
    </>
  );
}
export default HomePage;
