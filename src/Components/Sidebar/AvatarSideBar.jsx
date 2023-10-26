import { Avatar, Dropdown } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/user.slice";
function AvatarSideBar() {
  const confirm = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  };
  const dispatch = useDispatch();
  dispatch(logout());
  const items = [{ key: "1", label: <a onClick={confirm}>Logout</a> }];

  return (
    <>
      <Dropdown menu={{ items }} placement="topLeft">
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 60, xl: 60, xxl: 60 }}
          icon={<AntDesignOutlined />}
        />
      </Dropdown>
    </>
  );
}
export default AvatarSideBar;
