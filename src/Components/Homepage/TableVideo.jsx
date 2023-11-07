import React, { useEffect, useState } from "react";
import { Pagination, Space, Table, Tag } from "antd";
import { getVideo } from "../../services/index";
import { COULDINARY_URL } from "../../config";
import "./style.css";
import { useNavigate } from "react-router-dom";


const TableVideo = () => {
  const [pageSize, setPageSize] = useState(3);
  const [pageIndex, setPageIndex] = useState(1);
  const [videos, setVideos] = useState([]);
  const [count, setCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Title",
      dataIndex: "titleVideo",
      key: "titleVideo",
      width: "10%",
      render: (text) => <a className="table-video_title">{text}</a>,
    },
    {
      title: "Link Video",
      dataIndex: "linkVideo",
      key: "linkVideo",
      width: "10%",
      render: (video) => <a className="table-video_link">{video}</a>,
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnailVideo",
      key: "thumbnailVideo",
      width: "20%",
      render: (value) => (
        <div>
          <img
            width={329}
            height={185}
            src={`${COULDINARY_URL}${value}`}
            onError={(error) => {
              console.log(error);
            }}
          />
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
          {value.tagVideo[0].split(",").map((tag, index) => {
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
      render: () => (
        <Space size="middle">
          <a
            onClick={() => {
              navigate("/edit-video");
            }}
          >
            Edit
          </a>
          <a>Delete</a>
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
