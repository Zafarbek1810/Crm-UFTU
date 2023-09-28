import React, { useEffect, useRef, useState } from "react";
import FileAddWrapper from "./style";
import { UploadOutlined } from "@ant-design/icons";
import FileProvider from "../../../../../Data/FileProvider";
import { Button } from "@mui/material";
import { Image } from "antd";
import MyLink from "../../../../Common/MyLink";
import MinLoader from "../../../../Common/MinLoader";

const FileAdd = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const imgRef = useRef(null);

  const [fileTypes, setFileTypes] = useState([
    {
      label: "Passport",
      value: "PASSPORT",
      hashIdList: [],
    },
    {
      label: "Passport tarjimasi",
      value: "PASSPORT_TRANSLATED",
      hashIdList: [],
    },
    {
      label: "Diplom",
      value: "DIPLOMA",
      hashIdList: [],
    },
    {
      label: "Diplom tarjimasi",
      value: "DIPLOMA_TRANSLATED",
      hashIdList: [],
    },
    {
      label: "Rasm",
      value: "PHOTO",
      hashIdList: [],
    },
    {
      label: "Boshqa",
      value: "OTHER",
      hashIdList: [],
    },
  ]);

  useEffect(() => {
    setLoading(true);
    FileProvider.fileGetAll(id)
      .then(async (res) => {
        const urlPromises = await Promise.all(
          res.data.data.map((imgItem) => {
            return new Promise(async (res) => {
              const url = await previewFile(imgItem.hashId);
              res({
                hashId: imgItem.hashId,
                url,
                type: imgItem.fileTypes,
              });
            });
          })
        );

        setFileTypes((fileTypes) => {
          const newFileTypes = [...fileTypes];
          newFileTypes.forEach((item) => {
            const hashIdList = urlPromises.filter(
              (imgItem) => imgItem.type === item.value
            );
            item.hashIdList = hashIdList;
          });

          return newFileTypes;
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOnchange = (e, obj) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    FileProvider.fileUpload(id, obj.value, formData)
      .then(async (res) => {
        const newItemUrl = await previewFile(res.data.hashId);
        setFileTypes((fileTypes) => {
          const newFileTypes = [...fileTypes];
          const index = newFileTypes.findIndex(
            (item) => item.value === obj.value
          );
          newFileTypes[index].hashIdList.push({
            hashId: res.data.hashId,
            url: newItemUrl,
            type: obj.value,
          });
          return newFileTypes;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUrlFromBlob = async (blobFile) => {
    var reader = new window.FileReader();
    reader.readAsDataURL(blobFile);
    return new Promise((res) => {
      reader.onload = function () {
        res(reader.result);
      };
    });
  };

  const previewFile = async (hashId) => {
    return FileProvider.filePreview(hashId)
      .then(async (res) => {
        const blob = new Blob([res.data], {
          type: res.headers["content-type"],
        });
        return await getUrlFromBlob(blob);
      })
      .catch((err) => {
        return "";
      });
  };

  return (
    <FileAddWrapper>
      <div className="top">
        <h3>Talabalarga file biriktirish</h3>
      </div>

      <div className="wrapper">
        {fileTypes.map((obj, index) => (
          <div key={index} style={{ width: "30%" }} className="inner">
            <h3>{obj.label}</h3>
            {obj.hashIdList.length < 5 ? (
              <input type="file" ref={imgRef} onChange={(e) => handleOnchange(e, obj)} />
            ) : (
              "Maxsimal yuklash miqdori 5ta"
            )}
            <div className="imgs">
            {obj.hashIdList.length ?  obj.hashIdList.map(({ hashId, url }, index) => (
              <Image
                src={url}
                className="img"
                key={index}
                style={{ width: 100, height: 100, objectFit: "cover" }}
              ></Image>
            )) : <img 
            className="noItem" src="/images/image.png"/>
            }
            </div>
          </div>
        ))}
      </div>

      <MyLink
        to="/dashboard/students"
        className="col-2 btn btn-success btn-rounded"
        variant="contained"
      >
        Saqlash
      </MyLink>
    </FileAddWrapper>
  );
};

export default FileAdd;
