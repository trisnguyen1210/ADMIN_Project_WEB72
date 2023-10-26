import { Avatar, List, Button } from "antd";
import "./style.css";
import { useState } from "react";
import CircleProgress from "./CircleProgress";
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

const TasksPage = () => {
  const [numberPage, setNumberState] = useState(1);
  const changePage = (action) => {
    if (action === "next") {
      setNumberState(numberPage + 1);
    } else if (action === "previous") {
      setNumberState(numberPage - 1);
    }
  };
  return (
    <>
      <div className="background">
        <div className="taskpage_background">
          <div className="taskpage_item">
            <List
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                      />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background TasksPagelications, is refined by Ant UED Team"
                  />
                  <CircleProgress />
                </List.Item>
              )}
            />
          </div>

          <div className="taskpage_button">
            {numberPage >= 1 ? (
              <>
                <Button onClick={() => changePage("previous")}>
                  PreviousPage
                </Button>
              </>
            ) : (
              <>
                <Button disabled>PreviousPage</Button>
              </>
            )}
            <p>{`${numberPage}`}</p>
            {numberPage <= 99 ? (
              <>
                <Button onClick={() => changePage("next")}>NextPage</Button>
              </>
            ) : (
              <>
                <Button disabled>NextPage</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default TasksPage;
