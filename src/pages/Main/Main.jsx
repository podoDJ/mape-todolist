import React from "react";
import TodoList from "../../components/TodoList/TodoList";

const Main = () => {
  return (
    <div
      style={{
        marginTop: "130px",
      }}
    >
      <TodoList todoTypeIs={"All"} />
    </div>
  );
};

export default Main;
