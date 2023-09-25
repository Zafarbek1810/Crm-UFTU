import React, { useEffect, useRef, useState } from "react";
import StudentInfoWrapper from "./style";
import StudentProvider from "../../../../../Data/StudentProvider";
import FileProvider from "../../../../../Data/FileProvider";
import { Image } from "antd";

const StudentInfo = ({ id }) => {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(false);
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
    StudentProvider.getOneStudent(id)
      .then((res) => {
        setStudent(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
    <StudentInfoWrapper>
      <div className="top">
        <h3 className="col-2">Talaba haqida</h3>
      </div>
      <div className="content">
        <div className="table">
          <table style={{ width: "100%" }}>
            <tr>
              <th>Ismi:</th>
              <td>{student.first_name}</td>
            </tr>
            <tr>
              <th>Familyasi:</th>
              <td>{student.last_name}</td>
            </tr>
            <tr>
              <th>Millati:</th>
              <td>{student.citizenship}</td>
            </tr>
            <tr>
              <th>Jinsi:</th>
              <td>{student.genders}</td>
            </tr>
            <tr>
              <th>Tug`ilgan sanasi:</th>
              <td>{student.birth_date}</td>
            </tr>
            <tr>
              <th> Tug`ilgan joyi:</th>
              <td>{student.place_of_birth}</td>
            </tr>
            <tr>
              <th>Manzili:</th>
              <td>{student.address}</td>
            </tr>
            <tr>
              <th>Muassasa nomi:</th>
              <td>{student.institution}</td>
            </tr>
            <tr>
              <th>Passport raqami:</th>
              <td>{student.passport_number}</td>
            </tr>
            <tr>
              <th>Berilgan sanasi:</th>
              <td>{student.given_date}</td>
            </tr>
            <tr>
              <th>Amal qilish muddati:</th>
              <td>{student.valid_date}</td>
            </tr>
            <tr>
              <th>Sertifikat turi:</th>
              <td>{student.certificateType}</td>
            </tr>
            <tr>
              <th> Sertifikat raqami:</th>
              <td>{student.certificate_number}</td>
            </tr>
            <tr>
              <th>Universitet:</th>
              <td>{student.university_name}</td>
            </tr>
            <tr>
              <th>Fakultet:</th>
              <td>{student.faculty_name}</td>
            </tr>
            <tr>
              <th>Yo`nalish:</th>
              <td>{student.specialty_name}</td>
            </tr>
            <tr>
              <th>O`quv davri:</th>
              <td>{student.year_from} / {student.year_to}</td>
            </tr>
          </table>
        </div>
        <div className="images">
        {fileTypes.map((obj, index) => (
          <div key={index} style={{ width: "30%" }} className="inner">
            <h3>{obj.label}</h3>
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
      </div>
    </StudentInfoWrapper>
  );
};

export default StudentInfo;
