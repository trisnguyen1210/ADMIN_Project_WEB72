import {
  InfoCircleOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Input, Tooltip, Modal, Upload, Button, Form } from "antd";
import { COULDINARY_URL } from "../../config/index";
import { Checkbox } from "antd";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideoId, updateVideo } from "../../services";
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
  const param = useParams();
  const navigate = useNavigate();
  const [dataVideo, setDataVideo] = useState({});
  const [statusChange, setStatusChange] = useState({
    title: false,
    url: false,
    tag: false,
    content: false,
  });

  const [fileList, setFileList] = useState([
    {
      uid: "1",
      name: "image.png",
      status: "done",
      url: `${COULDINARY_URL}${dataVideo?.thumbnailVideo}`,
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.name.replace(" ", "-");
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const handleSubmit = async (values) => {
    try {
      const userNow = JSON.parse(localStorage.getItem("user")).user.username;
      const imgThumbnail = fileList[0]?.originFileObj;
      const formData = new FormData();
      formData.append("titleVideo", values.titleVideo);
      formData.append("URL", values.URL);
      formData.append("contentVideo", values.contentVideo);
      formData.append("thumbnailVideo", imgThumbnail);
      formData.append("tagVideo", values.tagVideo);
      formData.append("createBy", userNow);
      const result = await updateVideo(param.id, formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = (info) => {
    setStatusChange((prevStatusChange) => ({
      ...prevStatusChange,
      [info]: !prevStatusChange[info], // Toggle the value
    }));
  };

  const getDataVideo = async () => {
    const getDataVideoID = await getVideoId(`${param.id}`);
    setDataVideo(getDataVideoID.data.Info[0]);
  };

  if (dataVideo.thumbnailVideo && fileList.length != 0) {
    fileList[0].url = `${COULDINARY_URL}${dataVideo.thumbnailVideo}`;
  }

  useEffect(() => {
    getDataVideo();
  }, []);
  return (
    <>
      <div className="edit-video">
        <div className="edit-video_title">Edit video</div>
        <div className="edit-video_input">
          {Object.keys(dataVideo).length > 0 ? (
            <>
              <Form name="basic" onFinish={handleSubmit} autoComplete="off">
                <div className="edit-video_input_title">
                  <h3>Title video:</h3>
                  <div className="edit-video_data">
                    <div id="input_title">
                      <Form.Item
                        name="titleVideo"
                        rules={[
                          { required: true, message: "Must input title" },
                        ]}
                        initialValue={dataVideo?.titleVideo}
                      >
                        <Input
                          placeholder={dataVideo?.titleVideo}
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
                          disabled={!statusChange.title}
                          suffix={
                            <Tooltip title="Extra information">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                        />
                      </Form.Item>
                    </div>
                    <Button
                      onClick={() => {
                        changeStatus("title");
                      }}
                    >
                      Change
                    </Button>
                  </div>
                </div>
                <div className="edit-video_input_url">
                  <h3>URL video:</h3>
                  <div className="edit-video_data">
                    <div id="input_url">
                      <Form.Item
                        name="URL"
                        rules={[{ require: true, message: "Please input URL" }]}
                        initialValue={dataVideo?.linkVideo}
                      >
                        <Input
                          placeholder={dataVideo?.linkVideo}
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
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
                    </div>
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
                  <div className="edit-video_data">
                    <Form.Item
                      name="tagVideo"
                      initialValue={dataVideo.tagVideo}
                    >
                      <Checkbox.Group
                        options={tagsVideo}
                        disabled={!statusChange?.tag}
                      />
                    </Form.Item>
                    <Button
                      onClick={() => {
                        changeStatus("tag");
                      }}
                    >
                      Change
                    </Button>
                  </div>
                </div>
                <div className="edit-video_input_content">
                  <h3>Content video:</h3>
                  <div className="edit-video_data">
                    <div id="input_content">
                      <Form.Item
                        name="contentVideo"
                        initialValue={dataVideo?.contentVideo}
                      >
                        <TextArea
                          placeholder={dataVideo?.contentVideo}
                          allowClear
                          disabled={!statusChange.content}
                        />
                      </Form.Item>
                    </div>
                    <Button
                      onClick={() => {
                        changeStatus("content");
                      }}
                    >
                      Change
                    </Button>
                  </div>
                </div>
                <div className="create-video_input_user">
                  <h3>User add</h3>
                  <div id="input_user">
                    <Form.Item name="userCreate">
                      <Input
                        placeholder={`Create by ${dataVideo?.createBy}`}
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        suffix={
                          <Tooltip title="Account create this video">
                            <InfoCircleOutlined
                              style={{ color: "rgba(0,0,0,.45)" }}
                            />
                          </Tooltip>
                        }
                        disabled
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="create-video_input_thumnail">
                  <h3>Thumnail video</h3>
                  <Form.Item
                    name="thumbnailVideo"
                    initialValue={dataVideo?.thumbnailVideo}
                  >
                    <div>
                      <Upload
                        beforeUpload={() => false}
                        action=""
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {fileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                      >
                        <img
                          alt="example"
                          style={{
                            width: "100%",
                          }}
                          src={previewImage}
                        />
                      </Modal>
                    </div>
                  </Form.Item>
                </div>
                <Form.Item>
                  <div className="create-video_input_submit">
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default EditVideoPage;
