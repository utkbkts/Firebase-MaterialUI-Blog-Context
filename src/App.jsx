import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Notfound from "./pages/Notfound";
import Detail from "./pages/Detail";
import About from "./pages/About";
import AddEditBlog from "./pages/AddEditBlog";
import Home from "./pages/Home";
import Header from "./components/Header";
import State from "./context/State";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { auth } from "./firebase/config";
import { signOut } from "firebase/auth";
import TagBlog from "./pages/TagBlog";
import CategoryBlog from "./pages/CategoryBlog";
import ScrollTop from "./components/ScrollTop";

const App = () => {
  const [User,setUser]=useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged((authuser)=>{
      if(authuser){
        setUser(authuser)
      }else{
        setUser(null)
      }
    })
  },[])
  const handleSignOut=()=>{
    signOut(auth)
    localStorage.removeItem("user")
  }
  return (
    <div className="App">
      <State>
        <Header handleSignOut={handleSignOut} User={User} setUser={setUser}/>
        <ScrollTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/create" element={<AddEditBlog />} />
          <Route path="/update/:id" element={<AddEditBlog />} />
          <Route path="/tag/:tag" element={<TagBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:category" element={ <CategoryBlog/>} />
          <Route path="/register" element={<Register User={User} setUser={setUser}/>} />
          <Route path="/login" element={<Login User={User} setUser={setUser}/>} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </State>
    </div>
  );
};

export default App;
