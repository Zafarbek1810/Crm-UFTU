import React, { useState } from "react";
import { AddUniversityWrapper, ModalContent, ModalHeader } from "./style";
import CloseIconSvg from "../../../../Common/Svgs/CloseIconSvg";
import ButtonLoader from "../../../../Common/ButtonLoader";
import { useForm } from "react-hook-form";
import UniversityProvider from "../../../../../Data/UniversityProvider";
import { toast } from "react-toastify";

const AddUniversity = ({onCloseModal}) => {
    const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmitUniversity = async (values) => {
    const body = {};
    body.name = values.name;

    setLoading(true);
    UniversityProvider.createUniversity(body)
      .then((res) => {
        reset();
        toast.success("Qo'shildi");
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
  return (
    <AddUniversityWrapper>
      <ModalHeader className="modal-header">
        <h2 className="title">Universitet qo`shish</h2>
        <button className="closeSvg" onClick={onCloseModal}>
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
            Qo`shish {loading && <ButtonLoader />}
          </button>
        </form>
      </ModalContent>
    </AddUniversityWrapper>
  );
};

export default AddUniversity;
