import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const Router = () => {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/input" element={<Input/>} />
          <Route path="/boss" element={<Boss />} />
          <Route path="/quest" element={<Quest />} />
          <Route path="/others" element={<Others />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </Layout>
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
