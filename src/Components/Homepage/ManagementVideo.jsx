import { Button } from "antd";
import { Link } from "react-router-dom";

function ManagementVideo() {
  return (
    <>
      <div className="manage">
        <div className="dashboard_title">DASHBOARD</div>
        <Link to={"/create-video"}>
          <Button type="primary">Add new video</Button>
        </Link>
      </div>
    </>
  );
}
export default ManagementVideo;
