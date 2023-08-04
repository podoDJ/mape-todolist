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
import GlobalStyle from "../GlobalStyle";
import CommentTest from "../pages/Main/CommentTest";

const Router = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // 로그인하면 세션스토리지에서 token을 가져옴. 원래는 token 비교를 통해 check를 해야 하지만 구현을 못해서 token 유무로만 했음.
    const token = sessionStorage.getItem("token")
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [isLoggedIn])
  return (
    <BrowserRouter>
    <GlobalStyle />
      {isLoggedIn ? (
        
        <Layout>
          
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/input" element={<Input />} />
            <Route path="/boss" element={<Boss />} />
            <Route path="/quest" element={<Quest />} />
            <Route path="/others" element={<Others />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/comment" element={<CommentTest />} />

            <Route path="/login" element={<Navigate to="/"/>} />
          </Routes>
        </Layout>
      ) : (
        <BlockLayout>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Navigate to="/login"/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BlockLayout>
      )}
    </BrowserRouter>
  );
};

export default Router;
