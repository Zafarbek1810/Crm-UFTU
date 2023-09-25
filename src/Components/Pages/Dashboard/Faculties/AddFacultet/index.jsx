import React, { useEffect, useState } from "react";
import { AddFakultetWrapper, ModalContent, ModalHeader } from "./style";
import CloseIconSvg from "../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../Common/ButtonLoader";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FacultiesProvider from "../../../../../Data/FacultiesProvider";
import Select from "react-select";
import UniversityProvider from "../../../../../Data/UniversityProvider";

const AddFakultet = ({ onCloseModal }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [university, setUniversity] = useState([]);
  const [facultyId, setFacultyId] = useState(null);

  useEffect(() => {
    UniversityProvider.getAllAUniversity()
      .then((res) => {
        setUniversity(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const onSubmitFaculty = async (values) => {
    const body = {
      name: values.name,
      price: values.price.replace(/\s/g, ""),
      universities: {
        id: facultyId,
      },
    };

    setLoading(true);
    FacultiesProvider.createFaculty(body)
      .then((res) => {
        reset();
        toast.success(res.data?.message);
        onCloseModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const optionFaculty = university.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  
  function formatRaqam() {
    let input = document.getElementById("raqamInput");
    let value = input.value.replace(/\D/g, ""); // Raqamlardan boshqa belgilarni olib tashlash
    let formattedValue = "";

    for (let i = value.length - 1, j = 0; i >= 0; i--) {
      formattedValue = value[i] + formattedValue;
      j++;
      if (j === 3 && i !== 0) {
        formattedValue = " " + formattedValue; // Oxiridan 3-ta raqamdan sanab ketish
        j = 0;
      }
    }

    input.value = formattedValue;
  }

  
  return (
    <AddFakultetWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Fakultet qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitFaculty)}
        >
          <div className="label">
            <label>Universitet</label>
            <Controller
              control={control}
              name="region"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="Universitetni tanlang"
                  options={optionFaculty}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setFacultyId(v.value);
                  }}
                  ref={ref}
                />
              )}
            />
          </div>
          <div className="label">
            <label>Nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Fakultet nomi"}
              {...register("name", { required: true })}
            />
          </div>
          <div className="label">
            <label>Narxi</label>
            <input
               id="raqamInput"
               autoComplete="off"
               onInput={formatRaqam}
              className="form-control"
              placeholder={"Narxi"}
              {...register("price", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success btn-rounded m-1"
            style={{ display: "flex" }}
          >
            Qo`shish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </AddFakultetWrapper>
  );
};

export default AddFakultet;
