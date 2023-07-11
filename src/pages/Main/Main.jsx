import React from "react";
import TodoList from "../../components/TodoList/TodoList";
import LoginComp from "../../components/UserComp/LoginComp";

const Main = () => {
  return (
    <div
      style={{
        marginTop: "100px",
      }}
    >
      <LoginComp />
      <br />
      <TodoList />
    </div>
  );
};

export default Main;
