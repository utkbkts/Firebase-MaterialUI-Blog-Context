import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "../utils/Auth.scss";
import MyContext from "../context/Context";
import { useNavigate } from "react-router-dom";

const initialState = {
  FirstName: "",
  LastName: "",
  Email: "",
  Password: "",
  confirmPassword: "",
  selectedFile: null,
  previewImage: null,
};

const Register = ({User}) => {
  const [state, setstate] = useState(initialState);
  const context = useContext(MyContext);
  const { mode, Register } = context;
  const router = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await Register(
        Email,
        Password,
        FirstName,
        LastName,
        selectedFile
      );
      if (user) {
        console.log("kayıt başarılı");
        setstate("")
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    FirstName,
    LastName,
    Email,
    Password,
    confirmPassword,
    selectedFile,
    previewImage
  } = state;

  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setstate({
        ...state,
        selectedFile: file,
        previewImage: event.target.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  useEffect(()=>{
    if(User){
      router("/")
    }
  },[User])
  return (
    <div className="Form">
      <h3
        style={{
          color: mode === "dark" ? "white" : "",
        }}
      >
        Sign Up
      </h3>
      <div className="__a">
        <form action="" onSubmit={handleSubmit}>
          <div className="firstName">
            <FormControl>
              <InputLabel
                style={{
                  color: mode === "dark" ? "white" : "",
                }}
                htmlFor="name-input"
              >
                Name
              </InputLabel>
              <Input
                name="FirstName"
                value={FirstName}
                onChange={handleChange}
                required
                type="text"
                id="name-input"
                aria-describedby="name-helper-text"
                style={{
                  borderBottom: mode === "dark" ? "1px solid white" : "",
                }}
              />
              <FormHelperText
                style={{
                  color: mode === "dark" ? "white" : "",
                }}
                id="name-helper-text"
              >
                Please enter your name
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel
                style={{
                  color: mode === "dark" ? "white" : "",
                }}
                htmlFor="name-input"
              >
                LastName
              </InputLabel>
              <Input
                name="LastName"
                value={LastName}
                onChange={handleChange}
                required
                type="text"
                id="name-input"
                aria-describedby="name-helper-text"
                style={{
                  borderBottom: mode === "dark" ? "1px solid white" : "",
                }}
              />
              <FormHelperText
                style={{
                  color: mode === "dark" ? "white" : "",
                }}
                id="name-helper-text"
              >
                Please enter your LastName
              </FormHelperText>
            </FormControl>
          </div>

          <FormControl>
            <InputLabel
              style={{
                color: mode === "dark" ? "white" : "",
              }}
              htmlFor="email-input"
            >
              Email address
            </InputLabel>
            <Input
              value={Email}
              onChange={handleChange}
              required
              type="email"
              name="Email"
              id="email-input"
              aria-describedby="email-helper-text"
              style={{
                borderBottom: mode === "dark" ? "1px solid white" : "",
              }}
            />
            <FormHelperText
              style={{
                color: mode === "dark" ? "white" : "",
              }}
              id="email-helper-text"
            >
              Please enter your email
            </FormHelperText>
          </FormControl>

          <div className="__c">
            <FormControl>
              <InputLabel
                style={{
                  color: mode === "dark" ? "white" : "",
                }}
                htmlFor="password-input"
              >
                Password
              </InputLabel>
              <Input
                value={Password}
                onChange={handleChange}
                required
                type="password"
                name="Password"
                id="password-input"
                aria-describedby="password-helper-text"
                style={{
                  borderBottom: mode === "dark" ? "1px solid white" : "",
                }}
              />
              <FormHelperText
                style={{
                  color: mode === "dark" ? "white" : "",
                }}
                id="password-helper-text"
              >
                Please enter your password
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel
                style={{
                  color: mode === "dark" ? "white" : "",
                }}
                htmlFor="password-input"
              >
                Confirm Password
              </InputLabel>
              <Input
                value={confirmPassword}
                onChange={handleChange}
                required
                type="password"
                name="confirmPassword"
                id="password-input"
                aria-describedby="password-helper-text"
                style={{
                  borderBottom: mode === "dark" ? "1px solid white" : "",
                }}
              />
              <FormHelperText
                style={{
                  color: mode === "dark" ? "white" : "",
                }}
                id="password-helper-text"
              >
                Please enter your confirm password
              </FormHelperText>
            </FormControl>
          </div>
          <FormControl className="file">
            <input
              accept=".jpg, .jpeg, .png"
              className={""}
              id="contained-button-file"
              onChange={handleFileChange}
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              {previewImage ? ( 
                <Avatar
                  src={previewImage}
                  style={{ margin: "10px", width: "60px", height: "60px" }}
                />
              ) : (
                <IconButton>
                  <Avatar
                    src=""
                    style={{ margin: "10px", width: "60px", height: "60px" }}
                  />
                </IconButton>
              )}
            </label>
          </FormControl>
          <div>
            <Button type="submit" variant="contained">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
