import React, { useContext } from "react";
import "./Header.scss";
import MyContext from "../context/Context";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Avatar, Button, ListItemButton } from "@mui/material";
import MobilNavbar from "./MobilNavbar";
import { Link } from "react-router-dom";
const Header = ({ User, setUser, handleSignOut }) => {
  const context = useContext(MyContext);
  const { mode, toggleMode, setForm, form } = context;
  const userID = User?.uid;

  const handleToggleMode = () => {
    toggleMode();
    const modeElement = document.querySelector(".mode");
    modeElement.classList.add("animate-mode");
    setTimeout(() => {
      modeElement.classList.remove("animate-mode");
    }, 1000);
  };
  return (
    <>
      <div className="Content">
        <div className="Navbar">
          <div>
            <h1>Blog Media</h1>
          </div>
          <ul className="__a">
            <Link to={"/"}>
              {" "}
              <ListItemButton>Home</ListItemButton>
            </Link>
            <Link to={"/create"}>
              {" "}
              <ListItemButton>Create</ListItemButton>
            </Link>
            <ListItemButton>About</ListItemButton>
            <Link to={"/blogs"}>
              {" "}
              <ListItemButton>Blogs</ListItemButton>
            </Link>
          </ul>
          <ul className="__b">
            {userID ? (
              <>
                <Avatar
                  width={50}
                  height={50}
                  src={User?.photoURL}
                  alt="image"
                />
                <span>Hi,{User?.displayName}</span>
                <Button
                  onClick={handleSignOut}
                  variant="outlined"
                  color="error"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Link to={"/login"}>
                  <ListItemButton>Login</ListItemButton>
                </Link>
                <Link to={"/register"}>
                  <ListItemButton>Sign Up</ListItemButton>
                </Link>
              </>
            )}
            <ListItemButton
              className={`mode ${mode === "light" ? "active" : ""}`}
              onClick={handleToggleMode}
            >
              {mode === "light" ? <WbSunnyIcon /> : <DarkModeIcon />}
            </ListItemButton>
          </ul>
        </div>
      </div>
      <MobilNavbar />
    </>
  );
};

export default Header;
