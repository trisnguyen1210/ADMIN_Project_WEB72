import React, { useState } from "react";
import { Avatar } from "antd";

import {
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Button, Menu, Switch } from "antd";
import "./style.css";
import { useNavigate } from "react-router-dom";
import AvatarSideBar from "./AvatarSideBar.jsx";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Homepage", "1", <PieChartOutlined />),
  getItem("Category", "2", <DesktopOutlined />),
  getItem("Best rate", "3", <ContainerOutlined />),
  getItem("Performance", "sub1", <MailOutlined />, [
    getItem("Option 4", "4"),
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
  ]),
];

const Sidebar = () => {
  const [theme, setTheme] = useState("light");
  const [collapsed, setCollapsed] = useState(true);
  const navigation = useNavigate();

  const navigatePage = (e) => {
    const path = { 1: "/", 2: "/user", 3: "/task", 4: "/performance" };
    const pathPage = Object.values(path)[e.key - 1];
    navigation(`${pathPage}`);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };

  document.body.classList = `theme_${theme}`;

  return (
    <div className="sidebar">
      <div>
        <div className="sidebar_btn">
          <div>
            <Button type="primary" onClick={toggleCollapsed}>
              {collapsed ? <QuestionOutlined /> : <MenuFoldOutlined />}
            </Button>
          </div>
        </div>
        <div className="sidebar_menu">
          <Menu
            onClick={navigatePage}
            defaultSelectedKeys={["1"]}
            mode="inline"
            theme={theme}
            inlineCollapsed={collapsed}
            items={items}
          />
        </div>
      </div>
      <div className="sidebar_footer">
        <div className="sidebar_footer_avatar">
          <AvatarSideBar />
        </div>
        <div className="sidebar_footer_switch">
          <Switch
            checked={theme === "dark"}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
