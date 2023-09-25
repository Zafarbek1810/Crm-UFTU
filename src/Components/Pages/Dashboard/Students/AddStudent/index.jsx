import React, { useEffect, useState } from "react";
import { AddStudentWrapper, ModalContent, ModalHeader } from "./style";
import CloseIconSvg from "../../../../Common/Svgs/CloseIconSvg";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ButtonLoader from "../../../../Common/ButtonLoader";
import UniversityProvider from "../../../../../Data/UniversityProvider";
import FacultiesProvider from "../../../../../Data/FacultiesProvider";
import SpecialtiesProvider from "../../../../../Data/SpecialtiesProvider";
import StudentProvider from "../../../../../Data/StudentProvider";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import BackSvg from "../../../../Common/Svgs/BackSvg";
import { PatternFormat } from "react-number-format";

const AddStudent = ({ id }) => {
  const router = useRouter();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [genderId, setGenderId] = useState("");
  const [sertificateTypeId, setSertificateTypeId] = useState("");
  const [universityId, setUniversityId] = useState(null);
  const [university, setUniversity] = useState([]);
  const [facultyId, setFacultyId] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [specialId, setSpecialId] = useState(null);
  const [special, setSpecial] = useState([]);
  const [educationFormId, setEducationFormId] = useState(null);
  const [contactPersonId, setContactPersonId] = useState(null);

  useEffect(() => {
    UniversityProvider.getAllAUniversity()
      .then((res) => {
        setUniversity(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    FacultiesProvider.getAllFaculty()
      .then((res) => {
        setFaculty(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (id) {
      StudentProvider.getOneStudent(id)
        .then((res) => {
          console.log(res.data.data);
          setValue("first_name", res.data.data.first_name);
          setValue("last_name", res.data.data.last_name);
          setValue("citizenship", res.data.data.citizenship);
          setValue("address", res.data.data.address);
          setValue("institution", res.data.data.institution);
          setValue("passport_number", res.data.data.passport_number);
          setValue("certificate_number", res.data.data.certificate_number);
          setValue("birth_date", res.data.data.birth_date);
          setValue("place_of_birth", res.data.data.place_of_birth);
          setValue("given_date", res.data.data.given_date);
          setValue("valid_date", res.data.data.valid_date);
          setValue("year_from", res.data.data.year_from);
          setValue("year_to", res.data.data.year_to);
          setValue(
            "genders",
            res.data.data.genders === "MALE" ? optionGender[0] : optionGender[1]
          );
          setValue(
            "certificateType",
            res.data.data.certificateType === "DIPLOMA"
              ? optionSertficateType[0]
              : optionSertficateType[1]
          );
          setValue(
            "university",
            res.data.data.university_name ===
              optionUniversity.filter(
                (item) => item.value === res.data.data.university.id
              )[0].label
              ? optionUniversity.filter(
                  (item) => item.value === res.data.data.university.id
                )[0]
              : optionUniversity.filter(
                  (item) => item.value === res.data.data.university.id
                )[1]
          );
          setValue(
            "faculty",
            res.data.data.faculty_name ===
              optionFaculty.filter(
                (item) => item.value === res.data.data.faculty.id
              )[0].label
              ? optionFaculty.filter(
                  (item) => item.value === res.data.data.faculty.id
                )[0]
              : optionFaculty.filter(
                  (item) => item.value === res.data.data.faculty.id
                )[1]
          );
          setValue(
            "special",
            res.data.data.specialty_name ===
              optionSpecial.filter(
                (item) => item.value === res.data.data.specialty.id
              )[0].label
              ? optionSpecial.filter(
                  (item) => item.value === res.data.data.specialty.id
                )[0]
              : optionSpecial.filter(
                  (item) => item.value === res.data.data.specialty.id
                )[1]
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  useEffect(() => {
    SpecialtiesProvider.getAllSpecial()
      .then((res) => {
        setSpecial(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmitStudent = async (values) => {
    const body = {
      first_name: values.first_name,
      last_name: values.last_name,
      citizenship: values.citizenship,
      genders: genderId,
      birth_date: values.birth_date,
      place_of_birth: values.place_of_birth,
      address: values.address,
      institution: values.institution,
      passport_number: values.passport_number,
      given_date: values.given_date,
      valid_date: values.valid_date,
      certificateType: sertificateTypeId,
      certificate_number: values.certificate_number,
      university: {
        id: universityId,
      },
      faculty: {
        id: facultyId,
      },
      specialty: {
        id: specialId,
      },
      year_from: values.year_from,
      year_to: values.year_to,
      contactPerson: contactPersonId,
      contact_person_full_name: values.contact_person_full_name,
      contact_person_address: values.contact_person_address,
      contact_person_phone: values.contact_person_phone,
      contact_person_email: values.contact_person_email,
      student_phone_number: values.student_phone_number,
      student_email: values.student_email,
      educationForms: educationFormId,
    };
    setLoading(true);
    StudentProvider.createStudents(body)
      .then((res) => {
        reset();
        toast.success(res.data?.message);
        router.push("/dashboard/students");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const optionGender = [
    {
      value: "MALE",
      label: "Erkak",
    },
    {
      value: "FEMALE",
      label: "Ayol",
    },
  ];

  const optionEducationForm = [
    {
      value: "KUNDUZGI",
      label: "KUNDUZGI",
    },
    {
      value: "SIRTQI",
      label: "SIRTQI",
    },
    {
      value: "KECHKI",
      label: "KECHKI",
    },
  ];

  const optionContactPerson = [
    {
      value: "MOTHER",
      label: "ONASI",
    },
    {
      value: "FATHER",
      label: "OTASI",
    },
    {
      value: "BROTHER",
      label: "AKASI",
    },
    {
      value: "SISTER",
      label: "SINGLISI",
    },
    {
      value: "RELATIVE",
      label: "QARINDOSHI",
    },
  ];

  const optionSertficateType = [
    {
      value: "DIPLOMA",
      label: "Diplom",
    },
    {
      value: "CERTIFICATE",
      label: "Attestat",
    },
  ];

  const optionUniversity = university.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const optionFaculty = faculty.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const optionSpecial = special.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const backRoute = () => {
    router.push("/dashboard/students");
  };

  return (
    <AddStudentWrapper>
      <div className="top">
        <button onClick={backRoute}>
          <BackSvg />
        </button>
        <h2 className="title">
          {id ? "Talaba ma'lumotlarini o'zgartirish" : "Talaba qo'shish"}
        </h2>
      </div>
      <form className="p-3" onSubmit={handleSubmit(onSubmitStudent)}>
        <div className="label">
          <label>Ismi</label>
          <input
            autoComplete="off"
            className="form-control"
            placeholder={"Ismi"}
            {...register("first_name", { required: true })}
          />
        </div>
        <div className="label">
          <label>Familyasi</label>
          <input
            autoComplete="off"
            className="form-control"
            placeholder={"Familyasi"}
            {...register("last_name", { required: true })}
          />
        </div>
        <div className="label">
          <label>Millati</label>
          <input
            autoComplete="off"
            className="form-control"
            placeholder={"Millati"}
            {...register("citizenship", { required: true })}
          />
        </div>
        <div className="label">
          <label>Jinsi</label>
          <Controller
            control={control}
            name="genders"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                className="select col-3 w-100"
                value={value}
                placeholder="Jinsini tanlang"
                options={optionGender}
                onBlur={onBlur}
                onChange={(v) => {
                  onChange(v);
                  setGenderId(v.value);
                }}
                ref={ref}
              />
            )}
          />
        </div>
        <div className="label">
          <label>Telefon raqami</label>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 16,
              maxLength: 16,
            }}
            name="student_phone_number"
            render={({ field: { onChange, onBlur, value } }) => (
              <PatternFormat
                format="+998## ### ## ##"
                allowEmptyFormatting
                name="student_phone_number"
                value={value}
                style={{ width: "100%" }}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </div>
        <div className="label">
          <label>Tug`ilgan sanasi</label>
          <input
            type="date"
            className="form-control"
            {...register("birth_date")}
          />
        </div>
        <div className="label">
          <label>Tug`ilgan joyi</label>
          <input
            autoComplete="off"
            className="form-control"
            placeholder={"Tug'ilgan joyi"}
            {...register("place_of_birth", { required: true })}
          />
        </div>
        <div className="label">
          <label>Manzili</label>
          <input
            autoComplete="off"
            className="form-control"
            placeholder={"Manzili"}
            {...register("address", { required: true })}
          />
        </div>
        <div className="label">
          <label>Emaili</label>
          <input
            autoComplete="off"
            type="email"
            className="form-control"
            placeholder={"Emaili"}
            {...register("student_email", { required: true })}
          />
        </div>
        <div className="label">
          <label>Muassasa nomi</label>
          <input
            autoComplete="off"
            className="form-control"
            placeholder={"Muassasa nomi"}
            {...register("institution", { required: true })}
          />
        </div>
        <div className="label">
          <label>Passport raqami</label>
          <input
            autoComplete="off"
            className="form-control"
            placeholder={"Passport raqami"}
            {...register("passport_number", { required: true })}
          />
        </div>
        <div className="label">
          <label>Berilgan sanasi</label>
          <input
            type="date"
            className="form-control"
            placeholder={"Berilgan sanasi"}
            {...register("given_date")}
          />
        </div>
        <div className="label">
          <label>Amal qilish muddati</label>
          <input
            type="date"
            className="form-control"
            placeholder={"Amal qilish muddati"}
            {...register("valid_date")}
          />
        </div>
        <div className="label">
          <label>Sertifikat turi</label>
          <Controller
            control={control}
            name="certificateType"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                className="select col-3 w-100"
                value={value}
                placeholder="Sertifikat turini tanlang"
                options={optionSertficateType}
                onBlur={onBlur}
                onChange={(v) => {
                  onChange(v);
                  setSertificateTypeId(v.value);
                }}
                ref={ref}
              />
            )}
          />
        </div>
        <div className="label">
          <label>Sertifikat/Diplom raqami</label>
          <input
            autoComplete="off"
            className="form-control"
            placeholder={"Sertifikat/Diplom raqami"}
            {...register("certificate_number", { required: true })}
          />
        </div>

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
                options={optionUniversity}
                onBlur={onBlur}
                onChange={(v) => {
                  onChange(v);
                  setUniversityId(v.value);
                }}
                ref={ref}
              />
            )}
          />
        </div>
        <div className="label">
          <label>Fakultetlar</label>
          <Controller
            control={control}
            name="faculty"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                className="select col-3 w-100"
                value={value}
                placeholder="Fakultetni tanlang"
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
          <label>Yo`nalish</label>
          <Controller
            control={control}
            name="special"
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
          <label>O`quv turi</label>
          <Controller
            control={control}
            name="educationForms"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                className="select col-3 w-100"
                value={value}
                placeholder="O`quv turini tanlang"
                options={optionEducationForm}
                onBlur={onBlur}
                onChange={(v) => {
                  onChange(v);
                  setEducationFormId(v.value);
                }}
                ref={ref}
              />
            )}
          />
        </div>
        <div className="label">
          <label>O`quv davri(dan)</label>
          <input
            type="date"
            className="form-control"
            {...register("year_from")}
          />
        </div>
        <div className="label">
          <label>O`quv davri(gacha)</label>
          <input
            type="date"
            className="form-control"
            {...register("year_to")}
          />
        </div>

        <h3 style={{ width: "100%", textAlign: "center", margin: "20px 0" }}>
          Aloqa uchun shahs
        </h3>

        <div className="label">
          <label>Kimi bo`ladi</label>
          <Controller
            control={control}
            name="contactPerson"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                className="select col-3 w-100"
                value={value}
                placeholder="Aloqa uchun shahsni tanlang"
                options={optionContactPerson}
                onBlur={onBlur}
                onChange={(v) => {
                  onChange(v);
                  setContactPersonId(v.value);
                }}
                ref={ref}
              />
            )}
          />
        </div>

        <div className="label">
          <label>To`liq ismi</label>
          <input
            autoComplete="off"
            className="form-control"
            placeholder={"To`liq ismi"}
            {...register("contact_person_full_name", { required: true })}
          />
        </div>

        <div className="label">
          <label>Manzil</label>
          <input
            autoComplete="off"
            className="form-control"
            placeholder={"Manzil"}
            {...register("contact_person_address", { required: true })}
          />
        </div>

        <div className="label">
          <label>Telefon</label>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 16,
              maxLength: 16,
            }}
            name="contact_person_phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <PatternFormat
                format="+998## ### ## ##"
                allowEmptyFormatting
                name="contact_person_phone"
                value={value}
                style={{ width: "100%" }}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </div>

        <div className="label">
          <label>Emaili</label>
          <input
            autoComplete="off"
            className="form-control"
            placeholder={"Emaili"}
            {...register("contact_person_email", { required: true })}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success btn-rounded m-1"
          style={{ display: "flex" }}
        >
          {id ? "O'zgartirish" : "Qo'shish"} {loading && <ButtonLoader />}
        </button>
      </form>
    </AddStudentWrapper>
  );
};

export default AddStudent;
