import React, { useContext, useEffect, useState } from "react";
import MyContext from "../context/Context";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "./Header.scss"
const MobilNavbar = () => {
  const [active, setactive] = useState(false);
  const context = useContext(MyContext);
  const { mode, toggleMode } = context;
  const handleToggleMode = () => {
    toggleMode();
    const modeElement = document.querySelector(".mode");
    modeElement.classList.add("animate-mode");
    setTimeout(() => {
      modeElement.classList.remove("animate-mode");
    }, 1000);
  };
  const handleclick = () => {
    setactive(!active);
  };
  useEffect(() => {
    // Menü açıldığında, sayfa kaydırmayı engelle
    if (!active) {
      document.body.style.overflow = "hidden";
    } else {
      // Menü kapandığında, sayfa kaydırmayı tekrar etkinleştir
      document.body.style.overflow = "auto";
    }
  }, [active]);
  return (
    <>
      <div className={`Mobile-Navbar ${!active ? "open" : ""}`}>
        <div className={`Background ${active ? "open" : ""}`}></div>
        <div className="Navbar">
          <div className="Title">
            <h1>Social Media</h1>
          </div>
          <div className="Item">
            <ul className="__a">
              <li>Home</li>
              <li>Create</li>
              <li>About</li>
            </ul>
            <ul className="__b">
              <li>Login</li>
              <li>Sign Up</li>
              <span
                className={`mode ${mode === "light" ? "active" : ""}`}
                onClick={handleToggleMode}
              >
                {mode === "light" ? <WbSunnyIcon /> : <DarkModeIcon />}
              </span>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`hamburger ${active ? "open" : ""}`}
        onClick={handleclick}
      >
        <span
          style={{ background: mode === "dark" ? "white" : "" }}
          className="bar"
        ></span>
        <span
          style={{ background: mode === "dark" ? "white" : "" }}
          className="bar"
        ></span>
        <span
          style={{ background: mode === "dark" ? "white" : "" }}
          className="bar"
        ></span>
      </div>
    </>
  );
};

export default MobilNavbar;
