import "./style.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space, InputNumber, Tooltip, Form } from "antd";
import { useState } from "react";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { updateUser } from "../../services";

function ModalUser(params) {
  const { selectedUserData, setModalUser, allUser, setAllUser } = params;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [statusChange, setStatusChange] = useState({
    username: false,
    password: false,
    role: false,
  });

  const [inputValues, setInputValues] = useState({
    username: selectedUserData.username,
    password: selectedUserData.password,
    role: selectedUserData.role,
  });

  const userNow = JSON.parse(localStorage.getItem("user")).user.username;
  const handleSubmit = async (id, data) => {
    try {
      const result = await updateUser(id, data);
      if (result) {
        const indexUser = allUser.findIndex((e) => e._id === id);
        const newListUser = [...allUser];
        newListUser[indexUser] = result.data.Info;
        setAllUser(newListUser);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeStatusBtn = (value) => {
    setStatusChange((prevStatusChange) => ({
      ...prevStatusChange,
      [value]: !prevStatusChange[value],
    }));
  };

  return (
    <>
      <div className="background-modal">
        <div className="modal-content">
          <div className="user-modal_header">
            <h2 id="user-modal_title">Configure User</h2>
            <Button onClick={() => setModalUser(false)}>x</Button>
          </div>
          <div className="user-modal_content">
            <Form>
              <div className="user-modal_username">
                <Space>
                  <Space direction="horizontal">
                    <p>username:</p>
                    <Input
                      autoComplete="username"
                      placeholder="Enter your username"
                      defaultValue={selectedUserData.username}
                      disabled={!statusChange.username}
                      onChange={(e) => (inputValues.username = e.target.value)}
                    />
                  </Space>
                  <Button
                    onClick={() => {
                      handleChangeStatusBtn("username");
                    }}
                  >
                    Change
                  </Button>
                </Space>
              </div>
              <div className="user-modal_password">
                <Space>
                  <Form.Item>
                    <Space direction="horizontal">
                      <p>password:</p>
                      <Input.Password
                        autoComplete="current-password"
                        placeholder="input password"
                        defaultValue={selectedUserData.password}
                        disabled={!statusChange.password}
                        onChange={(e) => {
                          inputValues.password = e.target.value;
                        }}
                        visibilityToggle={{
                          visible: passwordVisible,
                          onVisibleChange: setPasswordVisible,
                        }}
                      />
                    </Space>
                  </Form.Item>
                  <Button
                    onClick={() => {
                      handleChangeStatusBtn("password");
                    }}
                  >
                    Change
                  </Button>
                </Space>
              </div>
              <div className="user-modal_role">
                <Space>
                  <Space wrap>
                    <p style={{ paddingLeft: 35 }}>role:</p>
                    <InputNumber
                      size="large"
                      min={1}
                      max={10}
                      disabled={!statusChange.role}
                      defaultValue={selectedUserData.role}
                      onChange={(e) => (inputValues.role = Number(e))}
                    />
                  </Space>
                  <Button
                    onClick={() => {
                      handleChangeStatusBtn("role");
                    }}
                  >
                    Change
                  </Button>
                </Space>
              </div>
            </Form>
          </div>
          <div className="user-modal_submit-btn">
            <Button
              onClick={() => {
                handleSubmit(selectedUserData._id, {
                  userNow,
                  inputValues,
                });
                // setModalUser(false);
              }}
            >
              Submit
            </Button>
            <Button
              onClick={() => {
                setModalUser(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ModalUser;
