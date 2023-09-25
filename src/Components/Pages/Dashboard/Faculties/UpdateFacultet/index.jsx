import React, { useEffect, useState } from "react";
import { AddFakultetWrapper, ModalContent, ModalHeader } from "../AddFacultet/style";
import CloseIconSvg from "../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../Common/ButtonLoader";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FacultiesProvider from "../../../../../Data/FacultiesProvider";
import Select from "react-select";
import UniversityProvider from "../../../../../Data/UniversityProvider";

const UpdateFaculty = ({ onCloseModal2, editFaculty }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [university, setUniversity] = useState([]);
  const [facultyId, setFacultyId] = useState(null);

  useEffect(() => {
    setValue("name", editFaculty.name);
    setValue("price", editFaculty.price);
    // setValue("university", {
    //   value: editFaculty.universities?.id,
    //   label: editFaculty.universities?.name,
    // });
  }, [editFaculty]);

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
      price: values.price,
      universities: {
        id: facultyId,
      },
    };

    body.id = editFaculty.id;

    setLoading(true);
    FacultiesProvider.updateFaculty(body)
      .then((res) => {
        reset();
        toast.success("Qo'shildi");
        onCloseModal2();
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

  
  return (
    <AddFakultetWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Fakultet o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
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
              name="university"
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
              autoComplete="off"
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
            O`zgartirish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </AddFakultetWrapper>
  );
};

export default UpdateFaculty;
