import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "../utils/Auth.scss";
import MyContext from "../context/Context";
import { useNavigate } from "react-router-dom";

const initialState = {
  FirstName: "",
  Email: "",
  Password: "",
};

const Login = ({User}) => {
  const [state, setstate] = useState(initialState);
  const context = useContext(MyContext);
  const { mode,login } = context;
  const router = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(FirstName,Email,Password)

      if (user) {
        console.log("kayıt başarılı");
        setstate("")
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { FirstName, Email, Password } = state;

  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
    if(User){
      router("/")
    }
  },[User])
  return (
    <div className="Form">
      <h3 style={{
                  color: mode === "dark" ? "white" : "",
                }}>Sign In</h3>
      <div className="__a">
        <form action="" onSubmit={handleSubmit}>
          <div className="firstName">
            <FormControl>
              <InputLabel style={{
                  color: mode === "dark" ? "white" : "",
                }} htmlFor="name-input">Name</InputLabel>
              <Input
                value={FirstName}
                name="FirstName"
                onChange={handleChange}
                required
                type="text"
                id="name-input"
                aria-describedby="name-helper-text"style={{
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
          </div>

          <FormControl>
            <InputLabel style={{
                  color: mode === "dark" ? "white" : "",
                }} htmlFor="email-input">Email address</InputLabel>
            <Input
              value={Email}
              onChange={handleChange}
              required
              name="Email"
              type="email"
              id="email-input"
              aria-describedby="email-helper-text"style={{
                borderBottom: mode === "dark" ? "1px solid white" : "",
              }}
            />
            <FormHelperText style={{
                  color: mode === "dark" ? "white" : "",
                }} id="email-helper-text" >
              Please enter your email
            </FormHelperText>
          </FormControl>

          <div>
            <FormControl>
              <InputLabel style={{
                  color: mode === "dark" ? "white" : "",
                }} htmlFor="password-input">Password</InputLabel>
              <Input
                value={Password}
                onChange={handleChange}
                required
                name="Password"
                type="password"
                id="password-input"
                aria-describedby="password-helper-text"style={{
                  borderBottom: mode === "dark" ? "1px solid white" : "",
                }}
              />
              <FormHelperText style={{
                  color: mode === "dark" ? "white" : "",
                }} id="password-helper-text">
                Please enter your password
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <Button type="submit" variant="contained">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
