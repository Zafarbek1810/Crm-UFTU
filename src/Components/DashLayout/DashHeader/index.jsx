import React, { useEffect, useState } from "react";
import { DashboardHeaderWrapper } from "./DashboardHeader.style";
import { useContextSelector } from "use-context-selector";
import UserContext from "../../../Context/UserContext";
import { useRouter } from "next/router";
import MyLink from "../../Common/MyLink";
import AuthProvider from "../../../Data/AuthProvider";
import { useConfirm } from "material-ui-confirm";

const DashboardHeader = ({ RefObj, setIsOpen, setOpen }) => {
  const logoutContext = useContextSelector(
    UserContext,
    (ctx) => ctx.actions.logout
  );

  const router = useRouter();
  const confirm = useConfirm();

  const handleOpen = () => {
    setOpen((p) => !p);
  };

  const handleLogout = () => {
    confirm({
      title: "Haqiqatan ham tizimdan chiqmoqchimisiz?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(() => {
        logoutContext();
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DashboardHeaderWrapper>
      <div className="top">
        <div className="wrap">
          <div className="left">
            <span  className="logo">
              <img src="/images/logo.svg" alt="" />
            </span>
            <div className="menu-toggle" onClick={handleOpen}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            
          </div>
          <div className="right">
            <h3></h3>
            <button onClick={handleLogout} title="Chiqish">
              Chiqish <img src="/images/logout.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </DashboardHeaderWrapper>
  );
};

export default DashboardHeader;
