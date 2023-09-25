import React, { useEffect, useState } from "react";
import { AddFakultetWrapper, ModalContent, ModalHeader } from "../AddSpecial/style";
import CloseIconSvg from "../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../Common/ButtonLoader";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FacultiesProvider from "../../../../../Data/FacultiesProvider";
import Select from "react-select";
import SpecialtiesProvider from "../../../../../Data/SpecialtiesProvider";

const UpdateSpecial = ({ onCloseModal2, editSpecial }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [faculty, setFaculty] = useState([]);
  const [specialId, setSpecialId] = useState(null);

  useEffect(() => {
    setValue("name", editSpecial.name);
    // setValue("university", {
    //   value: editFaculty.universities?.id,
    //   label: editFaculty.universities?.name,
    // });
  }, [editSpecial]);

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
    body.id = editSpecial.id;

    setLoading(true);
    SpecialtiesProvider.updateSpecial(body)
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

  const optionFaculty = faculty.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  
  return (
    <>
      <ModalHeader className="modal-header">
        <h2 className="title">Mutaxasislik o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
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
              name="special"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select col-3 w-100"
                  value={value}
                  placeholder="Fakultetni tanlang"
                  options={optionFaculty}
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
              placeholder={"Fakultet nomi"}
              {...register("name", { required: true })}
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
    </>
  );
};

export default UpdateSpecial;
