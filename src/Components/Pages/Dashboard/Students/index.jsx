import React, { useEffect, useState } from "react";
import StudentWrapper from "./style";
import { Button, Drawer, IconButton } from "@mui/material";
import StudentProvider from "../../../../Data/StudentProvider";
import MinLoader from "../../../Common/MinLoader";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Dropdown, Menu, Modal, theme } from "antd";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const Students = () => {
  const router = useRouter();
  const confirm = useConfirm();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const {
    token: { colorBgLayout, colorTextTertiary },
  } = theme.useToken();

  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [fileTypeId, setFileTypeId] = useState(null);
  const [isKrill, setIsKrill] = useState(false);

  const optionType = [
    {
      value: 1,
      label: "Shartnoma",
    },
    {
      value: 2,
      label: "Anketa",
    },
  ];

  const optionIsKrill = [
    {
      value: true,
      label: "Krilcha",
    },
    {
      value: false,
      label: "Lotincha",
    },
  ];

  const handleDeleteStudent = (obj) => {
    confirm({
      title: "Haqiqatan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(() => {
        StudentProvider.deleteStudent(obj.id)
          .then((res) => {
            setStudent(student.filter((item) => item.id !== obj.id));
            toast.success(res.data?.message);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    StudentProvider.getAllStudent()
      .then((res) => {
        setStudent(res.data.data.content);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const openPage = () => {
    router.push("/dashboard/student-add");
  };

  const openMemo = (id) => {
    window.open(`/dashboard/add-memo?id=${id}`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=200,width=800,height=700");
  };

  const handleOk = () => {
    setConfirmLoading(true);
    StudentProvider.fileDownload(studentId, fileTypeId, isKrill)
      .then((res) => {
        const blob = new Blob([res.data], {
          type: "application/pdf",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileTypeId === 1 ? "shartnoma.pdf" : "anketa.pdf";
        link.click();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setConfirmLoading(false);
        setOpen(false);
          setValue("fileType", null);
          setValue("isKrill", null);
      });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const downloadAnketa = (id) => {
    StudentProvider.fileDownload(id, 2, true)
      .then((res) => {
        const blob = new Blob([res.data], {
          type: "application/pdf",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "anketa.pdf";
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const downloadShartnoma = (id) => {
    StudentProvider.fileDownload(id, 1, true)
      .then((res) => {
        const blob = new Blob([res.data], {
          type: "application/pdf",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "shartnoma.pdf";
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const downloadEslatma = (id) => {
    StudentProvider.fileDownloadEslatma(id,  true)
      .then((res) => {
        const blob = new Blob([res.data], {
          type: "application/pdf",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "eslatma.pdf";
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <StudentWrapper>
      <div className="top">
        <h3 className="col-2">Talabalar</h3>

        <Button
          class="col-2 btn btn-success btn-rounded"
          variant="contained"
          onClick={openPage}
        >
          Talaba qo`shish
        </Button>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ minWidth: "4%" }} className="col">
              №
            </th>
            <th style={{ minWidth: "14%" }} className="col">
              Ismi Familyasi
            </th>
            <th style={{ minWidth: "14%" }} className="col">
              Muassasa nomi
            </th>
            <th style={{ minWidth: "14%" }} className="col">
              Pasport raqami
            </th>
            <th style={{ minWidth: "21%" }} className="col">
              Universitet, Fakultet, Yo`nalish
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              O`quv davri
            </th>
            <th style={{ minWidth: "10%" }} className="col">
              Talaba IDsi
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            student.map((obj, index) => (
              <Dropdown
                key={index}
                overlay={
                  <Menu>
                   <Menu.Item key="1">
                      <Button
                        onClick={
                          () => {
                            // setOpen(true);
                            downloadAnketa(obj.id);
                          }
                        }
                      >
                        Anketa yuklash
                      </Button>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Button
                        onClick={
                          () => {
                            // setOpen(true);
                            downloadShartnoma(obj.id);
                          }
                        }
                      >
                        Shartnoma yuklash
                      </Button>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Button
                        onClick={
                          () => {
                            openMemo(obj.id);
                          }
                        }
                      >
                        Eslatma yuklash
                      </Button>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <Button
                        onClick={() =>
                          router.push(`/dashboard/file-add?id=${obj.id}`)
                        }
                      >
                        Fayl yuklash
                      </Button>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <Button
                        onClick={() =>
                          router.push(`/dashboard/student-add?id=${obj.id}`)
                        }
                      >
                        Tahrirlash
                      </Button>
                    </Menu.Item>
                    <Menu.Item key="6">
                      <Button onClick={() => handleDeleteStudent(obj)}>
                        O`chirish
                      </Button>
                    </Menu.Item>
                  </Menu>
                }
                trigger={["contextMenu"]}
              >
                <tr>
                  <td style={{ minWidth: "4%" }} className="col">
                    {index + 1}
                  </td>
                  <td
                    style={{ minWidth: "14%" }}
                    className="col"
                    onClick={() =>
                      router.push(`/dashboard/student-info?id=${obj.id}`)
                    }
                  >
                    {obj.first_name} {obj.last_name} {obj.middle_name}
                  </td>
                  <td style={{ minWidth: "14%" }} className="col">
                    {obj.institution}
                  </td>
                  <td style={{ minWidth: "14%" }} className="col">
                    {obj.passport_number}
                  </td>
                  <td style={{ minWidth: "21%" }} className="col">
                    {obj.university?.name}/{obj.faculty?.name}/
                    {obj.specialty?.name}
                  </td>
                  <td style={{ minWidth: "15%" }} className="col">
                    {obj.year_from}/{obj.year_to}
                  </td>
                  <td style={{ minWidth: "10%" }} className="col">
                    SU-{obj.id}
                  </td>
                </tr>
              </Dropdown>
            ))
          ) : (
            <MinLoader />
          )}
        </tbody>
      </table>

      <Modal
        title="Hujjatlarni yuklash"
        open={open}
        centered
        onOk={handleOk}
        okText="Yuklash"
        cancelText="Bekor qilish"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
      >
        <div className="wrapper">
          <Controller
            control={control}
            name="fileType"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                className="select col-3 w-100 mt-4"
                value={value}
                placeholder="Hujjat turini tanlang"
                options={optionType}
                onBlur={onBlur}
                onChange={(v) => {
                  onChange(v);
                  setFileTypeId(v.value);
                }}
                ref={ref}
              />
            )}
          />
          <Controller
            control={control}
            name="isKrill"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                className="select col-3 w-100 mt-4"
                value={value}
                placeholder="Lotincha / Krilcha"
                options={optionIsKrill}
                onBlur={onBlur}
                onChange={(v) => {
                  onChange(v);
                  setIsKrill(v.value);
                }}
                ref={ref}
              />
            )}
          />
        </div>
      </Modal>
    </StudentWrapper>
  );
};

export default Students;
