'use client'
import '@/css/admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShield, faBook } from "@fortawesome/free-solid-svg-icons";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, memo } from "react";

export default function AdminSidebar() {
  const [activePage, setActivePage] = useState("main");
  const path = usePathname();
  const router = useRouter();

  function switching(page) {
    setActivePage(page);
    if (page === "main") router.push("/admin/dashboard");
    else if (page === "users") router.push("/admin/dashboard/users");
    else if (page === "courses") router.push("/admin/dashboard/courses");
    else router.push("/");
  }

  useEffect(() => {
    if (path.startsWith("/admin/dashboard/users")) setActivePage("users");
    else if (path.startsWith("/admin/dashboard/courses")) setActivePage("courses");
    else setActivePage("main");
  }, [path]);

  const SideBarDock = memo(function SectionCard({ name, label, icon }) {
    return (
      <li>
        <span
          className={activePage === name ? "menu-active hidden md:block" : "hover:bg-base-200 duration-300 hidden md:block"}
          id={name}
          onClick={() => switching(name)}
        >
          <FontAwesomeIcon icon={icon} /> {label}
        </span>
        <div className={activePage === name ? "menu-active block md:hidden tooltip tooltip-left" : "block md:hidden tooltip tooltip-left"} onClick={() => switching(name)} data-tip={label}>
          <FontAwesomeIcon icon={icon} size="lg" />
        </div>
      </li>
    );
  });

  return (
    <div className="w-full h-full flex justify-end bg-base-100">
      <ul className="menu min-h-[90vh] w-56 border-l-2 direction-rtl text-right border-base-200">
        <div className="grid sticky top-18 gap-2">
          <SideBarDock name="main" label="الرئيسية" icon={faShield} />
          <SideBarDock name="users" label="المستخدمين" icon={faUser} />
          <SideBarDock name="courses" label="الدروس" icon={faBook} />
        </div>
      </ul>
    </div>
  );
}
