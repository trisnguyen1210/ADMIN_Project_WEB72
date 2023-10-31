import { Outlet } from "react-router-dom";
import Sidebar from "../Components/SideBar";

const MainLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="background">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
