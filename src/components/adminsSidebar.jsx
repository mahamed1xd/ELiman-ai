'use client'
import '@/css/admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShield } from "@fortawesome/free-solid-svg-icons";
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
    else router.push("/");
  }

  useEffect(() => {
    if (path.startsWith("/admin/dashboard/users")) setActivePage("users");
    else setActivePage("main");
  }, [path]);

  const SideBarDock = memo(function SectionCard({ name, label, icon }) {
    return (
      <li>
        <span
          className={activePage === name ? "menu-active" : "hover:bg-base-200 duration-300"}
          id={name}
          onClick={() => switching(name)}
        >
          <FontAwesomeIcon icon={icon} /> {label}
        </span>
      </li>
    );
  });

  return (
    <div className="w-full h-full flex justify-end">
      <ul className="menu min-h-[90vh] w-56 border-l-2 gap-2 direction-rtl text-right border-base-200">
        <SideBarDock name="main" label="الرئيسية" icon={faShield} />
        <SideBarDock name="users" label="المستخدمين" icon={faUser} />
      </ul>
    </div>
  );
}
