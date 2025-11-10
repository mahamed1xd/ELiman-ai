"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";


export default function NavbarComponent({ children }) {

  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const path = usePathname()
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    if (path.startsWith("/ai")) setActivePage("ai");
    else if (path.startsWith("/quran")) setActivePage("quran");
    else if (path.startsWith("/azkar")) setActivePage("azkar");
    else setActivePage("home");
  }, [path]);


  function switching(page) {
    setActivePage(page);
    router.push(
      page === "home" ? "/" :
        page === "ai" ? "/ai/chat" :
          page === "quran" ? "/quran" :
            "/azkar"
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
      <div id="nav" className="fixed border-neutral z-50 transition-all duration-100 navbar bg-base-100 shadow-md">
        <div className="navbar-start w-auto">
          <Link href="/" className="btn text-base-content hover:text-primary-content hover:bg-primary  duration-300 btn-ghost text-xl">Basera Ai</Link>
        </div>

        <div className="navbar-center hidden lg:justify-between lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link className="hover:bg-primary hover:text-primary-content duration-400 text-base-content" href="/ai/chat">AI Chat</Link></li>
            <li><Link className="hover:bg-primary hover:text-primary-content duration-400 text-base-content" href='/azkar'>Azkar</Link></li>
            <li><Link className="hover:bg-primary hover:text-primary-content duration-400 text-base-content" href='/quran'>Quran</Link></li>
          </ul>
        </div>

        <div className="navbar-end w-[80%]">
          <label className="swap swap-rotate mr-2">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" className="theme-controller" value="lemonade" />

            {/* moon icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="/icons/moon.svg"
              viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>



            {/* sun icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="/icons/sun.svg"
              viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
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
                <ul tabIndex={0} className="menu menu-sm dropdown-content border-2 border-primary bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  {role === "admin" && (
                    <li>
                      <Link href="/admin/dashboard" className="hover:bg-primary hover:text-primary-content duration-400 text-base-content">Dashboard</Link>
                    </li>
                  )}
                  <li><Link href="/profile" className="hover:bg-primary hover:text-primary-content duration-400 text-base-content">Profile</Link></li>
                  <li><Link href="/settings" className="hover:bg-primary hover:text-primary-content duration-400 text-base-content">Settings</Link></li>
                  <li><button onClick={handleLogout} className="hover:bg-primary hover:text-primary-content duration-400 text-base-content">Logout</button></li>
                </ul>
              </div>
          )}
        </div>
      </div>
      <div
        className="h-[4px] bg-primary transition-all duration-75   fixed top-[3.73rem] md:top-[3.73rems] lg:top-[65px] left-0 z-50"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {children}


      <div className="dock bg-neutral lg:hidden bottom-[-1px] w-[101%] text-neutral-content">
        <button className={activePage === "home" ? "dock-active" : ""} id="home" onClick={() => switching('home')}>
          <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><polyline points="1 11 12 2 23 11" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"></polyline><path d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></path><line x1="12" y1="22" x2="12" y2="18" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></line></g></svg>
          <span className="dock-label">Home</span>
        </button>

        <button id="azkar" className={activePage === "azkar" ? "dock-active" : ""} onClick={() => switching('azkar')}>
          <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><polyline points="3 14 9 14 9 17 15 17 15 14 21 14" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"></polyline><rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></rect></g></svg>
          <span className="dock-label">Azkar</span>
        </button>
        <button className={activePage === "quran" ? "dock-active" : ""} id="quran" onClick={() => switching('quran')}>
          <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><polyline points="3 14 9 14 9 17 15 17 15 14 21 14" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"></polyline><rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></rect></g></svg>
          <span className="dock-label">Quran</span>
        </button>


        <button id="ai" className={activePage === "ai" ? "dock-active" : ""} onClick={() => switching('ai')}>
          <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></circle><path d="m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318,1.768,1.768,2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954,1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></path></g></svg>
          <span className="dock-label">Ai chat</span>
        </button>
      </div>

    </div>

  );
}
