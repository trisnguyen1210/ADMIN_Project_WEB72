import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Tooltip, Modal, Upload, Button, Form } from "antd";
import { Checkbox, Col, Row } from "antd";
import "./style.css";
import { useEffect, useState } from "react";
import { getVideoId } from "../../services";
import TextArea from "antd/es/input/TextArea";
const tagsVideo = [
  "Action movie",
  "Adventure movie",
  "Biography",
  "Cartoon",
  "Comedy",
  "Documentary",
  "Drama",
  "Historical",
  "Horror",
  "Musical",
  "Romance",
  "Sitcom",
];

function EditVideoPage() {
  const [dataVideo, setDataVideo] = useState({});
  const [statusChange, setStatusChange] = useState({
    title: false,
    url: false,
    tag: false,
    content: false,
  });

  const tagX = [];
  for (let i = 0; i < dataVideo?.tagVideo?.length; i++) {
    tagX.push(dataVideo.tagVideo[i]);
  }
  const handleSubmit = (value) => {
    console.log(dataVideo);
  };

  const getDataVideo = async () => {
    const getDataVideoID = await getVideoId("6549508318536fcdf96204ac");
    setDataVideo(getDataVideoID.data.Info[0]);
    setTagVideo(getDataVideoID.data.Info[0].tagVideo);
  };

  const changeStatus = (info) => {
    setStatusChange((prevStatusChange) => ({
      ...prevStatusChange,
      [info]: !prevStatusChange[info], // Toggle the value
    }));
  };
  const [tagVideo, setTagVideo] = useState([]);

  const onChangeTag = (checkedValues) => {
    console.log(checkedValues);
    setTagVideo(checkedValues);
  };

  useEffect(() => {
    getDataVideo();
  }, [dataVideo.length]);
  return (
    <>
      <div className="edit-video">
        <div className="edit-video_title">Edit video</div>
        <div className="edit-video_input">
          <Form name="basic" onFinish={handleSubmit} autoComplete="off">
            <div className="edit-video_input_title">
              <h3>Title video:</h3>
              <Form.Item
                name="titleVideo"
                rules={[{ require: true, message: "Please input URL" }]}
              >
                <div className="edit-video_data">
                  {/* {console.log(dataVideo.titleVideo)} */}
                  <Input
                    placeholder={dataVideo?.titleVideo}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    disabled={!statusChange.title}
                    suffix={
                      <Tooltip title="Extra information">
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)" }}
                        />
                      </Tooltip>
                    }
                  />
                  <Button
                    onClick={() => {
                      changeStatus("title");
                    }}
                  >
                    Change
                  </Button>
                </div>
              </Form.Item>
            </div>
            <div className="edit-video_input_url">
              <h3>URL video:</h3>
              <div className="edit-video_data">
                <Form.Item
                  name="URL"
                  rules={[{ require: true, message: "Please input URL" }]}
                >
                  <Input
                    placeholder={dataVideo?.linkVideo}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    disabled={!statusChange.url}
                    suffix={
                      <Tooltip title="Extra information">
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)" }}
                        />
                      </Tooltip>
                    }
                  />
                </Form.Item>
                <Button
                  onClick={() => {
                    changeStatus("url");
                  }}
                >
                  Change
                </Button>
              </div>
            </div>
            <div className="edit-video_input_tag">
              {dataVideo.tagVideo ? (
                <>
                  <Form.Item name="tagVideo" initialValue={dataVideo.tagVideo}>
                    <Checkbox.Group
                      options={tagsVideo}
                      onChange={onChangeTag}
                      disabled={!statusChange?.tag}
                      value={dataVideo.tagVideo}
                    />
                  </Form.Item>
                </>
              ) : (
                <></>
              )}
              <Button
                onClick={() => {
                  changeStatus("tag");
                }}
              >
                Change
              </Button>
            </div>
            <div className="edit-video_input_content">
              <h3>Content video:</h3>
              {/* <Form.Item name="contentVideo"> */}
              <TextArea
                placeholder={dataVideo.contentVideo}
                defaultValue={dataVideo.contentVideo}
                allowClear
                disabled={!statusChange.content}
              />
              {/* </Form.Item>
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              */}
              <Button
                onClick={() => {
                  changeStatus("content");
                }}
              >
                Change
              </Button>
            </div>
            <Form.Item>
              <div className="create-video_input_submit">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditVideoPage;
