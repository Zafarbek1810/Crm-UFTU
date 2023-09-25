import React, { useEffect, useState } from "react";
import { AddSpecialWrapper, ModalContent, ModalHeader } from "./style";
import CloseIconSvg from "../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../Common/ButtonLoader";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FacultiesProvider from "../../../../../Data/FacultiesProvider";
import Select from "react-select";
import UniversityProvider from "../../../../../Data/UniversityProvider";
import SpecialtiesProvider from "../../../../../Data/SpecialtiesProvider";

const AddSpecial = ({ onCloseModal }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [faculty, setFaculty] = useState([]);
  const [specialId, setSpecialId] = useState(null);

  useEffect(() => {
    FacultiesProvider.getAllFaculty()
      .then((res) => {
        setFaculty(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const onSubmitSpecial = async (values) => {
    const body = {
      name: values.name,
      faculty: {
        id: specialId,
      },
    };

    setLoading(true);
    SpecialtiesProvider.createSpecial(body)
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

  const optionSpecial = faculty.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  
  return (
    <AddSpecialWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Mutaxasislik qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitSpecial)}
        >
          <div className="label">
            <label>Fakultetlar</label>
            <Controller
              control={control}
              name="region"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="Fakultetni tanlang"
                  options={optionSpecial}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setSpecialId(v.value);
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
              placeholder={"Mutaxasislik nomi"}
              {...register("name", { required: true })}
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
    </AddSpecialWrapper>
  );
};

export default AddSpecial;
