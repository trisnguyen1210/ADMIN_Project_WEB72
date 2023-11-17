import { Button } from "antd";
import { Link } from "react-router-dom";
import "./style.css";

function ManagementVideo() {
  return (
    <>
      <div className="manage">
        <div className="dashboard_title">Video Management</div>
        <div className="dashboard_video">
          <Link to={"/create-video"}>
            <Button type="primary">Add new video</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default ManagementVideo;
