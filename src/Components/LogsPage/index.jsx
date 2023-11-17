import { Avatar, List, Button } from "antd";
import "./style.css";
import { useEffect, useState } from "react";
import { getLog } from "../../services";
const data = [
  {
    title: "Task 1",
  },
  {
    title: "Task 2",
  },
  {
    title: "Task 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
];

const LogsPage = () => {
  const [pageSize, setPageSize] = useState(100);
  const [pageIndex, setPageIndex] = useState(1);
  const [logList, setLogList] = useState([]);
  const getPagingLogs = async () => {
    const result = await getLog(pageSize, pageIndex);
    setLogList(result.data.Info.logs);
  };
  useEffect(() => {
    getPagingLogs();
  }, []);
  return (
    <>
      <div className="background">
        <div className="taskpage_background">
          <div className="taskpage_item">
            <List
              dataSource={logList}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                      />
                    }
                    title={<a href="#">{item.username}</a>}
                    description={item.log}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default LogsPage;
