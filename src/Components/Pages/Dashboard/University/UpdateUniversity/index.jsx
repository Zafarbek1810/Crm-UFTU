import React, { useEffect, useState } from "react";
import CloseIconSvg from "../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../Common/ButtonLoader";
import { useForm } from "react-hook-form";
import UniversityProvider from "../../../../../Data/UniversityProvider";
import { toast } from "react-toastify";
import { AddUniversityWrapper, ModalContent, ModalHeader } from "../AddUniversity/style";

const UpdateUniversity = ({ onCloseModal2, editUniversity }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue("name", editUniversity.name);
  }, [editUniversity]);

  const onSubmitUniversity = async (values) => {
    const body = {};
    body.name = values.name;

    body.id = editUniversity.id;
    setLoading(true);
    UniversityProvider.updateUniversity(body)
      .then((res) => {
        reset();
        toast.success("Muvaffaqiyatli o'zgartirildi!");
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
  return (
    <AddUniversityWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Universitet o`zgartirish</h2>
        <button className="closeSvg" onClick={onCloseModal2}>
          <CloseIconSvg />
        </button>
      </ModalHeader>
      <ModalContent>
        <form
          className="p-3"
          style={{ width: 600 }}
          onSubmit={handleSubmit(onSubmitUniversity)}
        >
          <div className="label">
            <label>Nomi</label>
            <input
              autoComplete="off"
              className="form-control"
              placeholder={"Universitet nomi"}
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
    </AddUniversityWrapper>
  );
};

export default UpdateUniversity;
