import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./style.css";
import { login } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/slice/user.slice";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const user = await login(values.username, values.password);
      const remember = values.remember;
      if (remember === true) {
        localStorage.setItem("user", JSON.stringify(user.data));
      } else {
        sessionStorage.setItem("user", JSON.stringify(user.data));
      }
      dispatch(loginSuccess(user.data));
    } catch (error) {
      console.log(error);
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
        <div className="login_background">
          <div className="login_header">
            <h2>Login</h2>
            <h3>and see your task</h3>
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
