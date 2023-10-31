import React, { useEffect, useState } from "react";
import { Alert, Space } from "antd";
import "./style.css";
const Notification = () => {
  const [loginSuccessNoti, setLogInSuccessNoti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogInSuccessNoti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loginSuccessNoti ? (
        <>
          <Space className="homepage_notification" direction="vertical">
            <Alert message="Login-success" type="info" />
          </Space>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Notification;
