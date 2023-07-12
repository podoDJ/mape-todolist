import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "../pages/Main/Main";
import Detail from "../pages/Detail/Detail";
import Boss from "../pages/Main/Boss";
import Quest from "../pages/Main/Quest";
import Others from "../pages/Main/Others";
import Layout from "./Layout";
import Input from "../pages/Main/Input";
import Update from "../pages/Detail/Update";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Signup/Login";
import BlockLayout from "./BlockLayout";
import { auth } from "../firebase";

const Router = () => {
  // const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser)
  const [currentUser, setCurrentUser] = useState({})
  // console.log("currentUser=>",currentUser)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
        setCurrentUser(user)
      } else {
        setIsLoggedIn(false)
      }
    })
  }, [])
  console.log("라우터를 통하니?")


  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/input" element={<Input />} />
            <Route path="/boss" element={<Boss />} />
            <Route path="/quest" element={<Quest />} />
            <Route path="/others" element={<Others />} />
            <Route path="/:id" element={<Detail />} />
            <Route path="/update/:id" element={<Update />} />
          </Routes>
        </Layout>
      ) : (
        <BlockLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/Login"/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BlockLayout>
      )}
      {/* <AuthLayout>
        <Routes>
        <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          </Routes>
      </AuthLayout> */}
    </BrowserRouter>
  );
};

export default Router;
