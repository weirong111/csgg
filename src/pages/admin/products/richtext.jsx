import { Editor } from "@tinymce/tinymce-react";
import React from "react";

const Richtext = (props) => {
  const handleEditorChange = (value) => {
    console.log(value);
    props.do(value);
  };
  const editorObj = {
    height: "500px",
    language: "zh_CN",
    plugins: "table lists link image preview code",
    toolbar:
      "formatselect | code | preview | bold italic strikethrough forecolor backcolor |link image|alignleft aligncenter alignjustify | numlist bullist outdent|image",
    relative_urls: false,
    images_upload_handler: function (blobInfo, succFun, failFun) {
      var xhr, formData;
      var file = blobInfo.blob(); //转化为易于理解的file对象
      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open("POST", "http://123.60.224.233:8001/changshi/project/upload");
      xhr.onload = function () {
        var json;
        if (xhr.status != 200) {
          failFun("HTTP Error: " + xhr.status);
          return;
        }
        json = JSON.parse(xhr.responseText);
        console.log(json);
        console.log(json.data.url[0]);
        if (!json || typeof json.data.url[0] != "string") {
          failFun("Invalid JSON: " + xhr.responseText);
          return;
        }
        succFun(json.data.url[0]);
      };
      formData = new FormData();
      formData.append("file", file, file.name); //此处与源文档不一样
      xhr.send(formData);
    },
    file_picker_types: "image",
    image_abvtab: true,
    image_uploadtab: true,
    branding: false,
  };
  return (
    <div>
      {" "}
      <Editor
        inline={false}
        apiKey="0vrjs85o4yxb0o50f1rzeo7ci6ftughd8d2kngwaoutktlfu"
        init={{ ...editorObj }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};
export default Richtext;
