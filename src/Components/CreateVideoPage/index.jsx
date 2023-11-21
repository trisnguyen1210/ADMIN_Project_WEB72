import {
  InfoCircleOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Input, Tooltip, Modal, Upload, Button, Form } from "antd";
import { Checkbox } from "antd";
import { useState } from "react";
import "./style.css";
import { createVideo } from "../../services";
import { useNavigate } from "react-router-dom";
function CreateVideoPage() {
  const { TextArea } = Input;
  const [tagVideo, setTagVideo] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const navigate = useNavigate();

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

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onChange = (checkedValues) => {
    setTagVideo(checkedValues);
  };

  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

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
  const userNow = JSON.parse(localStorage.getItem("user")).user.username;

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
      const imgThumbnail = fileList[0]?.originFileObj;
      const formData = new FormData();
      formData.append("titleVideo", values.titleVideo);
      formData.append("URL", values.URL);
      formData.append("contentVideo", values.contentVideo);
      formData.append("thumbnailVideo", imgThumbnail);
      formData.append("tagVideo", tagVideo);
      formData.append("createBy", userNow);
      const result = await createVideo(formData);
      navigate("/ADMIN_Project_WEB72");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="create-video">
        <div className="create-video_title">Add new video</div>
        <div className="create-video_input">
          <Form name="basic" onFinish={handleSubmit} autoComplete="off">
            <div className="create-video_input_title">
              <h3>Title video:</h3>
              <Form.Item
                name="titleVideo"
                rules={[{ require: true, message: "Please input URL" }]}
              >
                <Input
                  placeholder="Enter title video"
                  prefix={<UserOutlined className="site-form-item-icon" />}
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
            <div className="create-video_input_url">
              <h3>URL video:</h3>
              <Form.Item
                name="URL"
                rules={[{ require: true, message: "Please input URL" }]}
              >
                <Input
                  placeholder="Enter url video"
                  prefix={<UserOutlined className="site-form-item-icon" />}
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
            <div className="create-video_input_tag">
              <h3>Tag Video:</h3>
              <Form.Item name="tagVideo">
                <Checkbox.Group options={tagsVideo} onChange={onChange} />
              </Form.Item>
            </div>
            <div className="create-video_input_content">
              <h3>Content video:</h3>
              <Form.Item name="contentVideo">
                <TextArea placeholder="Enter content video" allowClear />
              </Form.Item>
            </div>
            <div className="create-video_input_user">
              <h3>User add</h3>
              <Form.Item name="userCreate" initialValue={userNow}>
                <Input
                  placeholder="Create by User"
                  prefix={<UserOutlined className="site-form-item-icon" />}
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
            <div className="create-video_input_thumnail">
              <h3>Thumnail video</h3>
              <Form.Item name="thumbnailVideo">
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
        </div>
      </div>
    </>
  );
}
export default CreateVideoPage;
