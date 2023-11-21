import React, { useNavigate } from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
function ErrorLayout() {
  const navigate = useNavigate();
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate("/ADMIN_Project_WEB72");
            }}
          >
            Back Home
          </Button>
        }
      />
    </>
  );
}
export default ErrorLayout;
