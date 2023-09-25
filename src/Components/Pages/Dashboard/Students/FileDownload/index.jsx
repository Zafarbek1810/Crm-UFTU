import { Button } from "@mui/material";
import React, { useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import Select from "react-select";
import StudentProvider from "../../../../../Data/StudentProvider";
import FileDowloadWrapper from "./style";

const FileDownload = ({ id }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [fileTypeId, setFileTypeId] = useState(null);
  const [isKrill, setIsKrill] = useState(false);
  const [loading, setLoading] = useState(false);

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


  const downloadFile = () => { 
    setLoading(true);
    StudentProvider.fileDownload(id, fileTypeId, isKrill)
      .then((res) => {
        console.log(res);
        const blob = new Blob([res.data], {
          type: "application/pdf",
        });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "file.pdf";
        link.click();

        
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <FileDowloadWrapper>
      <h3>Hujjatlarni yuklab olish</h3>
      <div className="wrapper">
      <Controller
        control={control}
        name="fileType"
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <Select
            className="select col-3 w-25"
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
            className="select col-3 w-25"
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

      <Button variant="contained" color="primary" onClick={downloadFile} disabled={loading}>
        Yuklab olish {loading && <span className="spinner-border spinner-border-sm"></span>}
      </Button>
      </div>
    </FileDowloadWrapper>
  );
};

export default FileDownload;
