import React, { useEffect, useState } from "react";
import { FacultetWrapper } from "./style";
import { Button, Drawer, IconButton } from "@mui/material";
import EditSvg from "../../../Common/Svgs/EditSvg";
import MinLoader from "../../../Common/MinLoader";
import FacultiesProvider from "../../../../Data/FacultiesProvider";
import AddFakultet from "./AddFacultet";
import UpdateFaculty from "./UpdateFacultet";

const Faculties = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [faculty, setFaculty] = useState([]);
  const [editFaculty, setEditFaculty] = useState({});

  const handleEditFaculty = (obj) => {
    console.log(obj);
    setIsOpenModal2(true);
    setEditFaculty(obj);
  };

  useEffect(() => {
    setLoading(true);
    FacultiesProvider.getAllFaculty()
      .then((res) => {
        setFaculty(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isOpenModal, isOpenModal2]);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };
  const onCloseModal2 = () => {
    setIsOpenModal2(false);
  };

  return (
    <FacultetWrapper>
      <div className="top">
        <h3 className="col-2">Fakultetlar</h3>

        <Button
          class="col-2 btn btn-success btn-rounded"
          variant="contained"
          onClick={() => openModal()}
        >
          Fakultet qo`shish
        </Button>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ minWidth: "35%" }} className="col">
              Fakultet nomi
            </th>
            <th style={{ minWidth: "35%" }} className="col">
              Universitet
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Narxi
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            faculty.map((obj, index) => (
              <tr key={index}>
                <td style={{ minWidth: "35%" }} className="col">
                  {index + 1}. {obj.name}
                </td>
                <td style={{ minWidth: "35%" }} className="col">
                  {obj.universities?.name}
                </td>
                <td style={{ minWidth: "15%" }} className="col">
                  {obj.price.toLocaleString().replace(/,/g, " ")}
                </td>
                <td style={{ minWidth: "15%" }} className="col">
                  <div className="btns">
                    <a class="text-success mr-2" href="#">
                      <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                    </a>
                    <IconButton onClick={() => handleEditFaculty(obj)}>
                      <EditSvg />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <MinLoader />
          )}
        </tbody>
      </table>
      <Drawer
        anchor={"right"}
        open={isOpenModal}
        onClose={() => {
          onCloseModal();
        }}
      >
        <AddFakultet onCloseModal={onCloseModal} />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={isOpenModal2}
        onClose={() => {
          onCloseModal2();
        }}
      >
        <UpdateFaculty
          onCloseModal2={onCloseModal2}
          editFaculty={editFaculty}
        />
      </Drawer>
    </FacultetWrapper>
  );
};

export default Faculties;
