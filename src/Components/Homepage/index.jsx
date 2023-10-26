import { useState } from "react";
import { Input, Select, Button } from "antd";
import "./style.css";
import Notification from "./Notification";

function HomePage() {
  const { Search } = Input;
  const { Option } = Select;

  const [advanceSearch, setAdvanceSearch] = useState({
    time: false,
    location: false,
  });

  const handleTimeChange = (value) => {
    locationSearch = value;
  };

  let locationSearch = null;
  const toggleOptions = (type) => {
    setAdvanceSearch((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const handleSearch = (value, time, location) => {
    console.log("Đã tìm kiếm:", value);
    console.log("Thời gian:", time);
    console.log("Địa điểm:", location);
  };

  return (
    <>
      <div className="background">
        <Notification />
        <Search
          placeholder="What do you want searching?"
          onSearch={(value) => {
            handleSearch(value, locationSearch);
          }}
          enterButton
        />
        {advanceSearch.location ? (
          <>
            <Select
              placeholder="Chọn địa điểm"
              style={{ width: 150, marginRight: 10 }}
              onChange={handleTimeChange}
            >
              <Option value="Q.10">Q.10</Option>
              <Option value="Q.7">Q.7</Option>
              <Option value="Q.3">Q.3</Option>
              <Option value="Q.1">Q.1</Option>
            </Select>
          </>
        ) : null}
        <Button
          onClick={() => {
            toggleOptions("location");
          }}
        >
          {advanceSearch.location ? "Ẩn tùy chọn" : "Hiển thị tùy chọn"}
        </Button>
      </div>
    </>
  );
}
export default HomePage;
