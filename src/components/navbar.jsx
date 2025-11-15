"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCommentDots, faStarAndCrescent, faBookQuran, faUser, faCog, faSignOutAlt, faUserShield, faBars } from "@fortawesome/free-solid-svg-icons";
import PwaOnly from "./pwaprov";


export default function NavbarComponent() {

  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const path = usePathname()
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    if (path.startsWith("/ai")) setActivePage("ai");
    else if (path.startsWith("/quran")) setActivePage("quran");
    else if (path.startsWith("/azkar")) setActivePage("azkar");
    else if (path.startsWith("/settings")) setActivePage("settings");
    else if (path.startsWith("/profile")) setActivePage("profile");
    else if (path.startsWith("/admin/dashboard")) setActivePage("admin");
    else setActivePage("home");
  }, [path]);


  function switching(page) {
    setActivePage(page);
    router.push(
      page === "home" ? "/" :
        page === "ai" ? "/ai/chat" :
          page === "quran" ? "/quran" :
            page === "azkar" ? "/azkar" :
              page === "settings" ? "/settings" :
                page === "profile" ? "/profile" :
                  page === "admin" ? "/admin/dashboard" : "/"
    );
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


  const { user, logout } = useAuth();

  const [loggedIn, setLoggedIn] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // الكود ده بيتنفذ في المتصفح فقط
    const loginStatus = localStorage.getItem("loggedIn");
    const userRole = localStorage.getItem("role");
    setLoggedIn(loginStatus === "true");
    setRole(userRole);

    // لما تتغير بيانات localStorage (مثلاً بعد login)
    const handleStorageChange = () => {
      setLoggedIn(localStorage.getItem("loggedIn") === "true");
      setRole(localStorage.getItem("role"));
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
        <div className="navbar-start">
          <div className="hidden lg:justify-between lg:flex">
            <ul className="menu menu-horizontal flex-row-reverse px-1">
                <li><Link onClick={() => setActivePage("ai")} className={activePage === "ai" ? "bg-primary text-primary-content font-[ar2] mx-1" : "hover:bg-primary hover:text-primary-content duration-400 text-base-content font-[ar2] mx-1"} href="/ai/chat">الذكاء الاصطناعي</Link></li>
                <li><Link onClick={() => setActivePage("azkar")} className={activePage === "azkar" ? "bg-primary text-primary-content font-[ar2] mx-1" : "hover:bg-primary hover:text-primary-content duration-400 text-base-content font-[ar2] mx-1"} href='/azkar'>الأذكار</Link></li>
                <li><Link onClick={() => setActivePage("quran")} className={activePage === "quran" ? "bg-primary text-primary-content font-[ar2] mx-1" : "hover:bg-primary hover:text-primary-content duration-400 text-base-content font-[ar2] mx-1"} href='/quran'>القرآن الكريم</Link></li>
                <li><Link onClick={() => setActivePage("home")} className={activePage === "home" ? "bg-primary text-primary-content font-[ar2] mx-1" : "hover:bg-primary hover:text-primary-content duration-400 text-base-content font-[ar2] mx-1"} href='/'>الرئيسية</Link></li>
          </ul>
          </div>
        </div>

        <div className="navbar-end w-[80%]">
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
                  {role === "admin" && (
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
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4 direction-rtl" >
            {/* Sidebar content here */}
            <li><Link href="/" onClick={() => setActivePage("home")} className={activePage === "home" ? "bg-primary text-primary-content font-[ar2] my-1" : "active:bg-primary active:text-primary-content duration-400 text-base-content font-[ar2] my-1"}><FontAwesomeIcon icon={faHome} className="size-[1.2em]" /> الرئيسية</Link></li>
            <li><Link href="/azkar" onClick={() => setActivePage("azkar")} className={activePage === "azkar" ? "bg-primary text-primary-content font-[ar2] my-1" : "active:bg-primary active:text-primary-content duration-400 text-base-content font-[ar2] my-1"}><FontAwesomeIcon icon={faStarAndCrescent} className="size-[1.2em]" /> الأذكار</Link></li>
            <li><Link href="/quran" onClick={() => setActivePage("quran")} className={activePage === "quran" ? "bg-primary text-primary-content font-[ar2] my-1" : "active:bg-primary active:text-primary-content duration-400 text-base-content font-[ar2] my-1"}><FontAwesomeIcon icon={faBookQuran} className="size-[1.2em]" /> القرآن الكريم</Link></li>
            <li><Link href="/ai/chat" onClick={() => setActivePage("ai")} className={activePage === "ai" ? "bg-primary text-primary-content font-[ar2] my-1" : "active:bg-primary active:text-primary-content duration-400 text-base-content font-[ar2] my-1"}><FontAwesomeIcon icon={faCommentDots} className="size-[1.2em]" /> الذكاء الاصطناعي</Link></li>
          </ul>
        </div>
      </div>
      <div
        className="h-[4px] bg-primary transition-all duration-75   fixed top-[3.73rem] md:top-[3.73rems] lg:top-[65px] left-0 z-50"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <PwaOnly>

      <div className="dock bg-neutral lg:hidden bottom-[-1px] w-[101%] text-neutral-content">
        <button className={activePage === "home" ? "dock-active" : ""} id="home" onClick={() => switching('home')}>
          <FontAwesomeIcon icon={faHome} className="size-[1.2em]" />
            <span className="dock-label">الرئيسية</span>
        </button>

        <button id="azkar" className={activePage === "azkar" ? "dock-active" : ""} onClick={() => switching('azkar')}>
          <FontAwesomeIcon icon={faStarAndCrescent} className="size-[1.2em]" />
            <span className="dock-label">الأذكار</span>
        </button>
        <button className={activePage === "quran" ? "dock-active" : ""} id="quran" onClick={() => switching('quran')}>
          <FontAwesomeIcon icon={faBookQuran} className="size-[1.2em]" />
            <span className="dock-label">القرآن الكريم</span>
        </button>


        <button id="ai" className={activePage === "ai" ? "dock-active" : ""} onClick={() => switching('ai')}>
          <FontAwesomeIcon icon={faCommentDots} className="size-[1.2em]" />
            <span className="dock-label">الذكاء الاصطناعي</span>
        </button>
      </div>
      </PwaOnly>



    </div>
  );
}
