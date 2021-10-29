import React, { useState, useRef } from "react";
import { Card, Input, Button, Form, Upload } from "antd";
import { createApi } from "../../../services/products";
import { serverUrl } from "../../../utils/config";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import Richtext from "./richtext";
import { data } from "autoprefixer";

let data1 = "";
function Edit(props) {
  const handleSubmit = (values) => {
    console.log(values);
    const ul = values.url.fileList.map((item) => {
      return item.response.data.url;
    });

    const Url = ul.toString().split(",");

    console.log(data1);
    axios({
      method: "post",
      url: "http://123.60.224.233:8001/changshi/project/addParentProject",
      params: {
        comment: data1,
        title: values.tit,
        url: Url,
      },
    }).then((res) => {
      console.log(res);
    });
    createApi({ title: values.tit, comment: data1, url: Url })
      .then((res) => {
        props.history.push("/admin/products/list");
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        `http://123.60.224.233:8001/changshi/project/findProjectById/${"32ff8c5a24934dfcaa8990f32a6e748f"}`
      )
      .then((res) => {
        console.log(res);
      });
  };

  //  上传功能
  const [fileList, setFileList] = useState([]);

  //监测富文本

  //检测变化
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    console.log(fileList);
  };
  //组件
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Card title="工程实例编辑" bordered>
      <Form onFinish={(e) => handleSubmit(e)} scrollToFirstError>
        <Form.Item
          label="工程名称"
          name={"tit"}
          rules={[
            {
              required: true,
              message: "请填写工程名字!",
            },
          ]}
        >
          <Input placeholder="请填写工程名字" />
        </Form.Item>
        <Form.Item
          label="工程内容"
          name="comment"
          value={data1}
          // rules={[
          //   {
          //     required: true,
          //     message: "请填工程内容!",
          //   },
          // ]}
        >
          <Richtext
            do={(data) => {
              data1 = data;
              console.log(data1);
            }}
          />
          {/* <Input placeholder="请输入工程内容" /> */}
        </Form.Item>

        <Form.Item label="图片" name={"url"}>
          <Upload
            action={serverUrl}
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
          >
            {fileList.length >= 7 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            style={{ backgroundColor: "#428BCA" }}
          >
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Edit;
