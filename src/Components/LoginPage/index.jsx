import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Alert, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./style.css";
import { logIn } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/slice/user.slice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logInFail, useLogInFail] = useState({ status: false, message: "" });

  const handleSubmit = async (values) => {
    try {
      const user = await logIn(values.username, values.password);
      if (user) {
        let errorMessage = "";
        if (user.data.user.role === 1) {
          const remember = values.remember;
          if (remember === true) {
            localStorage.setItem("user", JSON.stringify(user.data));
          } else {
            sessionStorage.setItem("user", JSON.stringify(user.data));
          }
          dispatch(loginSuccess(user.data));
        } else {
          errorMessage = "No permission";
          useLogInFail({ status: true, message: errorMessage });
        }
      }
    } catch (error) {
      console.log(error);
      useLogInFail({ status: true, message: error?.response?.data?.message });
    }
  };

  const userFromState = useSelector((state) => state.user);

  useEffect(() => {
    if (userFromState.token != "") {
      navigate("/");
    }
  }, [userFromState]);

  return (
    <>
      <div className="login">
        {logInFail.status ? (
          <Space className="login_notification" direction="vertical">
            <Alert
              message="LogIn fail"
              showIcon
              description={logInFail.message}
              type="error"
              closable
            />
          </Space>
        ) : null}
        <div className="login_background">
          <div className="login_header">
            <h2>Login</h2>
            <h3>and management videos</h3>
          </div>
          <div className="login_body">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: `Please input your Username` },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  autoComplete="username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                <div id="login_register">
                  Or <a href="">register now!</a>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginPage;
