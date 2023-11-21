import React, { useEffect, useState, useRef } from "react";
import { Pagination, Space, Table, Tag, Input, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { deleteVideo, getVideo } from "../../services/index";
import { COULDINARY_URL } from "../../config";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./style.css";
import { useNavigate } from "react-router-dom";

const TableVideo = () => {
  const [pageSize, setPageSize] = useState(3);
  const [loadingThumnail, setLoadingThumnail] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [videos, setVideos] = useState([]);
  const [count, setCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const navigate = useNavigate();

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
    render: (value) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={value ? value.toString() : ""}
        />
      ) : (
        <a className="table-video_column">{value}</a>
      ),
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "titleVideo",
      key: "titleVideo",
      width: "10%",
      ...getColumnSearchProps("titleVideo"),
      // render: (text) => <a className="table-video_title">{text}</a>,
    },
    {
      title: "Link Video",
      dataIndex: "linkVideo",
      key: "linkVideo",
      width: "10%",
      ...getColumnSearchProps("linkVideo"),
      // render: (video) => <a className="table-video_link">{video}</a>,
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnailVideo",
      key: "thumbnailVideo",
      width: "20%",
      render: (value) => (
        <div>
          {!loadingThumnail ? (
            <>
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                    }}
                    spin
                  />
                }
              />
            </>
          ) : (
            <>
              <img
                width={329}
                height={185}
                src={`${COULDINARY_URL}${value}`}
                onError={(error) => {
                  setLoadingThumnail(true);
                }}
              />
            </>
          )}
        </div>
      ),
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "20%",
      render: (_, value) => (
        <>
          {value.tagVideo.map((tag, index) => {
            let color = "geekblue";
            if (tag.length <= 8) {
              color = "volcano";
            } else if (tag.length >= 12) {
              color = "green";
            }
            return (
              <div className="table-video_tags" key={index}>
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              </div>
            );
          })}
        </>
      ),
    },
    {
      title: "Content",
      dataIndex: "contentVideo",
      key: "contentVideo",
      width: "15%",
      render: (content) => (
        <div className="table-video_content">
          <p>{content}</p>
        </div>
      ),
    },
    {
      title: "Create time",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "15%",
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (data) => (
        <Space size="middle">
          <a
            onClick={() =>
              navigate(`/ADMIN_Project_WEB72/edit-video/${data._id}`)
            }
          >
            Edit
          </a>
          <a onClick={() => handleDelete(data)}>Delete</a>
        </Space>
      ),
    },
  ];

  const getPagingVideo = async () => {
    try {
      const result = await getVideo(pageSize, pageIndex);
      setVideos(result.data.Info.videos);
      setCount(result.data.Info.count);
      setTotalPage(result.data.Info.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (values) => {
    try {
      const id = values._id;
      const video = values.titleVideo;
      const userNow = JSON.parse(localStorage.getItem("user")).user.username;
      const result = await deleteVideo(id, { username: userNow, video });
      if (result) {
        setVideos(videos.filter((item) => item._id != id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPagingVideo();
  }, [pageSize, pageIndex]);
  return (
    <div className="table-video">
      <Table
        columns={columns}
        dataSource={videos}
        pagination={false}
        rowKey={(video) => video._id}
      />
      <div className="table-video_paging">
        <Pagination
          current={pageIndex}
          pageSize={pageSize}
          total={count}
          onChange={(page, pageSize) => {
            setPageIndex(page);
          }}
        />
      </div>
    </div>
  );
};
export default TableVideo;
