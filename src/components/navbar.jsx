"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";

export default function NavbarComponent() {

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const router = useRouter();
  const { user } = useAuth();
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
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("storage")); // لتحديث الـ Navbar فورًا
    router.push("/login");
  }

  return (
    <div >
      <div className="fixed z-50 navbar bg-base-100 shadow-sm">
        <div className="navbar-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><Link href="/ai/chat">AI Chat</Link></li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">Basera Ai</Link>
        </div>

        <div className="navbar-start hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/ai/chat">AI Chat</Link></li>
            <li><a>Item 3</a></li>
          </ul>
        </div>

        <div className="navbar-end">
          {loggedIn === null ? null : !loggedIn && !user ? (
            <Link href="/login" className="btn">Login</Link>
          ) : (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="User avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  {role === "admin" && (
                    <li>
                      <Link href="/admin/dashboard">Dashboard</Link>
                    </li>
                  )}
                  <li><Link href="/profile">Profile</Link></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
          )}
        </div>
      </div>
      <div
        className="h-[3px] bg-primary transition-all duration-75 fixed top-[64px] left-0 z-50"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
}
