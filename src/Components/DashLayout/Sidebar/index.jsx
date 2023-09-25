import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import UserContext from "../../../Context/UserContext";
import MyLink from "../../Common/MyLink";
import UserCircle from "../../Common/Svgs/UserCircle";
import { SidebarWrapper } from "./Sidebar.style";

const NavListMenu = [
  {
    title: "Universitetlar",
    path: "/dashboard/university",
    src: "/images/university.png",
    role: ["ROLE_ADMIN"],
  },
  {
    title: "Fakultetlar",
    path: "/dashboard/faculties",
    src: "/images/faculty.png",
    role: ["ROLE_ADMIN"],
  },
  {
    title: "Mutaxasisliklar",
    path: "/dashboard/specialties",
    src: "/images/special.png",
    role: ["ROLE_ADMIN"],
  },
  {
    title: "Talabalar",
    path: "/dashboard/students",
    src: "/images/students.png",
    role: ["ROLE_ADMIN"],
  },
  
];

const Sidebar = () => {
  const router = useRouter();

  const userRole = useContextSelector(
    UserContext,
    (ctx) => ctx.state.user.roles
  );
  console.log(userRole);

  const UmumiyListMenu = NavListMenu.filter(({ role }) =>
    role.includes(userRole)
  );

  return (
    <SidebarWrapper>
      <div className="sidebar-menu">
        {UmumiyListMenu.map(({ title, src, path }, idx) => (
          <MyLink
            className={router.pathname === path ? "activelink" : "link"}
            to={path}
            key={idx}
          >
            <img src={src} alt="" />
            {title}
          </MyLink>
        ))}
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
