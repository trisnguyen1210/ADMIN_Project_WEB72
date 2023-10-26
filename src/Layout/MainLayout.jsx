import { Outlet } from "react-router-dom";
import Sidebar from "../Components/SideBar";

const MainLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default MainLayout;
