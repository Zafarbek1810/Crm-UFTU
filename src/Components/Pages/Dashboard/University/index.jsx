import React, { useEffect, useState } from "react";
import { UniversityWrapper } from "./style";
import { Button, Drawer, IconButton } from "@mui/material";
import UniversityProvider from "../../../../Data/UniversityProvider";
import EditSvg from "../../../../Components/Common/Svgs/EditSvg";
import MinLoader from "../../../../Components/Common/MinLoader";
import AddUniversity from "./AddUniversity";
import UpdateUniversity from "./UpdateUniversity";

const University = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [university, setUniversity] = useState([]);
  const [editUniversity, setEditUniversity] = useState({});

  const handleEditUniversity = (obj) => {
    console.log(obj);
    setIsOpenModal2(true);
    setEditUniversity(obj);
  };

  useEffect(() => {
    setLoading(true);
    UniversityProvider.getAllAUniversity()
      .then((res) => {
        setUniversity(res.data.data);
        console.log(res.data);
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
    <UniversityWrapper>
      <div className="top">
        <h3 className="col-2">Universitetlar</h3>

        <Button
          class="col-2 btn btn-success btn-rounded"
          variant="contained"
          onClick={() => openModal()}
        >
          Universitet qo`shish
        </Button>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ minWidth: "70%" }} className="col">
              Universitet nomi
            </th>
            <th style={{ minWidth: "30%" }} className="col">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            university.map((obj, index) => (
              <tr key={index}>
                <td style={{ minWidth: "70%" }} className="col">
                  {index + 1}. {obj.name}
                </td>
                <td style={{ minWidth: "30%" }} className="col">
                  <div className="btns">
                    <a class="text-success mr-2" href="#">
                      <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                    </a>
                    <IconButton onClick={() => handleEditUniversity(obj)}>
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
        <AddUniversity onCloseModal={onCloseModal} />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={isOpenModal2}
        onClose={() => {
          onCloseModal2();
        }}
      >
        <UpdateUniversity
          onCloseModal2={onCloseModal2}
          editUniversity={editUniversity}
        />
      </Drawer>
    </UniversityWrapper>
  );
};

export default University;
