import "./style.css";
import { getUser } from "../../services";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Pagination, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ModalUser from "./ModalUser";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const [allUser, setAllUser] = useState([]);
  const navigate = useNavigate();
  const getDataAllUser = async () => {
    try {
      const result = await getUser(pageSize, pageIndex);
      setAllUser(result.data.Info.users);
      setCount(result.data.Info.count);
      setTotalPage(result.data.Info.totalPage);
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };
  const [selectedUserData, setSelectedUserData] = useState({});

  const [modalUser, setModalUser] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [count, setCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="user-edit_search_input">
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </div>
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "userrname",
      dataIndex: "username",
      key: "username",
      width: "20%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "password",
      dataIndex: "password",
      key: "password",
      width: "20%",
      ...getColumnSearchProps("password"),
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
      width: "10%",
      ...getColumnSearchProps("role"),
      sorter: (a, b) => a.role - b.role,
    },
    {
      title: "update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "20%",
      ...getColumnSearchProps("updatedAt"),
    },
    {
      title: "action",
      key: "action",
      width: "10%",
      render: (data) => (
        <Space size="middle">
          <a
            onClick={() => {
              setSelectedUserData(data);
              setModalUser(true);
            }}
          >
            Edit
          </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getDataAllUser();
  }, [pageIndex, pageSize]);

  return (
    <>
      <div className="dashboard_title">User Management</div>
      <div className="container card-avatar">
        <div className="user-table">
          <Table
            columns={columns}
            dataSource={allUser}
            pagination={false}
            rowKey={(user) => user._id}
          />
          <Pagination
            current={pageIndex}
            pageSize={pageSize}
            total={count}
            onChange={(page, pageSize) => {
              setPageIndex(page);
            }}
          />
          {modalUser ? (
            <>
              <ModalUser
                selectedUserData={selectedUserData}
                setModalUser={setModalUser}
                allUser={allUser}
                setAllUser={setAllUser}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default UserPage;
