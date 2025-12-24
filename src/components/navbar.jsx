"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, memo } from "react";
import { useAuth } from "@/context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCommentDots, faStarAndCrescent, faGraduationCap, faBookQuran, faBook, faUser, faCog, faSignOutAlt, faRadio, faUserShield, faBars } from "@fortawesome/free-solid-svg-icons";
import PwaOnly from "./pwaprov";


export default function NavbarComponent() {
  let { user, logout } = useAuth();
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const path = usePathname()
  const [activePage, setActivePage] = useState("home");


  const DocsLinks = memo(function SectionCard({ name, label, icon }) {
    return (
      <button className={activePage === name ? "dock-active" : ""} id={name} onClick={() => switching(`${name}`)}>
        <FontAwesomeIcon icon={icon} className="size-[1.2em]" />
        <span className="dock-label">{label}</span>
      </button>
    );
  });
  const LargeMenuLinks = memo(function SectionCard({ name, label }) {
    return (
      <li> <span onClick={() => switching(name)} className={activePage == `${name}` ? "bg-primary text-primary-content font-[ar2] mx-1" : "hover:bg-primary hover:text-primary-content duration-400 text-base-content font-[ar2] mx-1"}>{label} </span> </li>
    );
  });
  const SidebarLinks = memo(function SectionCard({ name, label, icon }) {
    return (
      <li><span onClick={() => switching(name)} className={activePage == name ? "bg-primary text-primary-content font-[ar2] my-1" : "active:bg-primary active:text-primary-content duration-400 text-base-content font-[ar2] my-1"}><FontAwesomeIcon icon={icon} className="size-[1.2em]" />{label}</span></li>

    );
  });



  useEffect(() => {
    if (path.startsWith("/ai")) setActivePage("ai");
    else if (path.startsWith("/quran")) setActivePage("quran");
    else if (path.startsWith("/azkar")) setActivePage("azkar");
    else if (path.startsWith("/settings")) setActivePage("settings");
    else if (path.startsWith("/profile")) setActivePage("profile");
    else if (path.startsWith("/courses")) setActivePage("courses");
    else if (path.startsWith("/hadiths")) setActivePage("hadiths");
    else if (path.startsWith("/radio")) setActivePage("radio");
    else if (path.startsWith("/admin/dashboard")) setActivePage("admin");
    else setActivePage("home");
  }, [path]);


  function switching(page) {
    router.push(
      page == "home" ? "/" :
        page == "ai" ? "/ai/chat" :
          page == "quran" ? "/quran" :
            page == "azkar" ? "/azkar" :
              page == "courses" ? "/courses" :
                page == "settings" ? "/settings" :
                  page == "profile" ? "/profile" :
                    page == "radio" ? "/radio" :
                      page == "hadiths" ? "/hadiths" :
                        page == "admin" ? "/admin/dashboard" : "/"
    );
    setActivePage(page);
  }


  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {

    if (scrollProgress > 0) {
      document.querySelector('#nav').classList.add('border-b-4')
    }
    if (scrollProgress == 0) {
      document.querySelector('#nav').classList.remove('border-b-4')
    }


  }, [scrollProgress])


  const userImage = localStorage.getItem("image")
  // setUser({ ...user, image: userImage })
  if (user) {
    if (user.image == null) {
      user.image = localStorage.getItem("image") || localStorage.getItem("profileImage")
    }
  }

  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    // الكود ده بيتنفذ في المتصفح فقط
    const loginStatus = localStorage.getItem("loggedIn");
    setLoggedIn(loginStatus === "true");


    // لما تتغير بيانات localStorage (مثلاً بعد login)
    const handleStorageChange = () => {
      setLoggedIn(localStorage.getItem("loggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function handleLogout() {
    logout()
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("storage")); // لتحديث الـ Navbar فورًا
    router.push("/login");
  }


  return (
    <div >
      <div className="drawer drawer-end">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div id="nav" className="fixed direction-rtl border-neutral z-5 transition-all duration-100 navbar bg-base-100 shadow-md">

        <div className="navbar-center w-auto">

            <div className="flex-none lg:hidden ml-1.5">
              <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <FontAwesomeIcon icon={faBars} size="lg" />
              </label>
            </div>

          <Link
            href="/"
              className="btn flex active:bg-primary active:text-primary-content justify-center items-center text-base-content hover:text-primary-content hover:bg-primary duration-300 text-4xl font-[logo]"
          >
            بصيره
          </Link>
        </div>
          <div className="navbar-start w-auto">
          <div className="hidden lg:justify-between lg:flex">
            <ul className="menu menu-horizontal flex-row-reverse px-1">
                <LargeMenuLinks name='ai' label='الذكاء الصطناعي' />
                <LargeMenuLinks name='radio' label='الراديو' />
                <LargeMenuLinks name='courses' label='الدروس' />
                <LargeMenuLinks name='azkar' label='الأذكار' />
                <LargeMenuLinks name='hadiths' label='الأحاديث الشريفة' />
                <LargeMenuLinks name='quran' label='القران الكريم' />
                <LargeMenuLinks name='home' label='الصفحة الرئيسية' />
          </ul>
          </div>
        </div>

          <div className="navbar-end w-auto absolute left-2.5">
          {loggedIn === null ? null : !loggedIn && !user ? (
            <Link href="/login" className="btn bg-base-300 text-base-content hover:bg-primary hover:text-primary-content duration-400">Login</Link>
          ) : (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-placeholder">
                  {user && user.image ? (
                    <>
                    <div className="w-12 border-2 border-primary rounded-full">
                    <img
                      alt="User avatar"
                        src={user.image}
                        /> </div> </>
                  ) : (
                    <div className="w-16 h-12 flex items-center justify-center border-2 border-primary rounded-full">
                      <span>{user?.name ? user.name.slice(0, 2).toUpperCase() : "U"}</span>
                    </div>
                  )}
                </div>
                <ul tabIndex={0} className="menu menu-md dropdown-content border-2 border-primary bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    {user.role === "admin" && (
                    <li>
                        <Link href="/admin/dashboard" onClick={() => setActivePage("admin")} className={activePage === "admin" ? "bg-primary text-primary-content font-[ar2] mx-1" : "hover:bg-primary hover:text-primary-content duration-400 text-base-content font-[ar2] mx-1"} > <FontAwesomeIcon icon={faUserShield} className="size-[1.2em]" /> لوحة التحكم</Link>
                    </li>
                  )}
                    <li><Link href="/profile" onClick={() => setActivePage("profile")} className={activePage === "profile" ? "bg-primary text-primary-content font-[ar2] mx-1" : "hover:bg-primary hover:text-primary-content duration-400 text-base-content font-[ar2] mx-1"} > <FontAwesomeIcon icon={faUser} className="size-[1.2em]" /> الملف الشخصي</Link></li>
                    <li><Link href="/settings" onClick={() => setActivePage("settings")} className={activePage === "settings" ? "bg-primary text-primary-content font-[ar2] mx-1" : "hover:bg-primary hover:text-primary-content duration-400 text-base-content font-[ar2] mx-1"} > <FontAwesomeIcon icon={faCog} className="size-[1.2em]" /> الإعدادات</Link></li>
                    <li><button onClick={handleLogout} className="active:bg-primary active:text-primary-content hover:bg-primary hover:text-primary-content duration-400 text-base-content font-[ar2] mx-1"> <FontAwesomeIcon icon={faSignOutAlt} className="size-[1.2em]" /> تسجيل الخروج</button></li>
                </ul>
              </div>
          )}
        </div>
      </div>
        <div className="drawer-side z-100">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 min-h-full w-[75%] p-4 direction-rtl" >
            {/* Sidebar content here */}
            <SidebarLinks name='home' icon={faHome} label='الصفحة الرئيسية' />
            <SidebarLinks name='quran' icon={faBookQuran} label='القران الكريم' />
            <SidebarLinks name='hadiths' icon={faBook} label='الأحاديث الشريفة' />
            <SidebarLinks name='azkar' icon={faStarAndCrescent} label='الأذكار' />
            <SidebarLinks name='courses' icon={faGraduationCap} label='الدروس' />
            <SidebarLinks name='radio' icon={faRadio} label='الراديو' />
            <SidebarLinks name='ai' icon={faCommentDots} label='الذكاء الاصطناعي' />
          </ul>
        </div>
      </div>
      <div
        className="h-[4px] bg-primary transition-all duration-75   fixed top-[3.73rem] md:top-[3.73rems] lg:top-[65px] left-0 z-50"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <PwaOnly>

      <div className="dock bg-neutral lg:hidden bottom-[-1px] w-[101%] text-neutral-content">
          <DocsLinks name='home' label='الرئيسية' icon={faHome} />
          <DocsLinks name='quran' label='القران الكريم' icon={faBookQuran} />
          <DocsLinks name='hadiths' label='الأحاديث الشريفة' icon={faBook} />
          <DocsLinks name='ai' label='الذكاء الصطناعي' icon={faCommentDots} />
      </div>
      </PwaOnly>



    </div>
  );
}
