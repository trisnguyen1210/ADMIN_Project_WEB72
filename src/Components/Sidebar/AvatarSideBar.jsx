import { Avatar, Dropdown } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logoutSucess } from "../../redux/slice/user.slice";
function AvatarSideBar() {
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    dispatch(logoutSucess());
  };
  const settingPage = () => {
    console.log("goto setting Page");
  };

  const items = [
    { key: "1", label: <a onClick={logOut}>Logout</a> },
    { key: "2", label: <a onClick={settingPage}>Setting</a> },
  ];

  return (
    <>
      <Dropdown menu={{ items }} placement="topLeft">
        <Avatar
          src={`https://xsgames.co/randomusers/assets/avatars/pixel/45.jpg`}
          size={{ xs: 24, sm: 32, md: 40, lg: 60, xl: 60, xxl: 60 }}
          icon={<AntDesignOutlined />}
        />
      </Dropdown>
    </>
  );
}
export default AvatarSideBar;
