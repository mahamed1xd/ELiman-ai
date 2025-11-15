"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/themeprov";

export default function Settings() {
  const { theme, changeTheme } = useTheme();

  const lightThemes = [
    "light", "cupcake", "bumblebee", "emerald", "corporate",
    "retro", "cyberpunk", "valentine", "garden", "lofi", "pastel",
    "fantasy", "wireframe", "cmyk", "autumn", "acid", "lemonade",
    "winter", "dim", "nord", "sunset",
  ];

  const darkThemes = [
    "dark", "synthwave", "halloween", "forest", "black", "luxury",
    "dracula", "business", "night", "coffee",
  ];

  return (
    <div className="w-[85%] p-4 flex bg-base-200 shadow-2xl rounded">
      <div className="flex flex-row-reverse items-center justify-between w-full">
        <p className="text-base-content">اختار الشكل</p>

        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            Theme
            <FontAwesomeIcon icon={faAngleDown} className="size-[1.2em]" />
          </div>

          <ul
            tabIndex="-1"
            className="dropdown-content overflow-y-scroll h-[200px] bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
          >
            <li className="menu-title opacity-60 px-2 py-1">Light Themes</li>

            {lightThemes.map((t) => (
              <li key={t}>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                  aria-label={t}
                  value={t}
                  checked={theme === t}
                  onChange={() => changeTheme(t)}
                />
              </li>
            ))}

            <div className="divider my-2"></div>

            <li className="menu-title opacity-60 px-2 py-1">Dark Themes</li>

            {darkThemes.map((t) => (
              <li key={t}>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                  aria-label={t}
                  value={t}
                  checked={theme === t}
                  onChange={() => changeTheme(t)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
