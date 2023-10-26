import React from "react";
import { Alert, Button, Space } from "antd";
const Notification = () => {
  return (
    <>
      <Space
        className="homepage_notification"
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Alert
          message="Check task uncomplete"
          showIcon
          description="Error Description Error Description Error Description Error Description"
          type="error"
          action={
            <Button size="small" danger>
              Detail
            </Button>
          }
        />
        <Alert
          message="Check task warning"
          description="Task AA"
          type="warning"
          action={
            <Space>
              <Button type="text" size="small">
                Check
              </Button>
            </Space>
          }
          closable
        />
        <Alert message="You have n task today" type="info" closable />
      </Space>
    </>
  );
};

export default Notification;
