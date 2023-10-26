import { Progress, Space } from "antd";

const conicColors = {
  "0%": "#87d068",
  "50%": "#ffe58f",
  "100%": "#ffccc7",
};

const CircleProgress = () => {
  const statusTask = ["active", "exception", "done"];
  return (
    <>
      <div className="taskpage_circleprogress">
        <Space wrap>
          <Progress type="circle" percent={5} strokeColor={conicColors} />
        </Space>
      </div>
    </>
  );
};
export default CircleProgress;
