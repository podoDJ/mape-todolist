import React from "react";
import TodoList from "../../components/TodoList/TodoList";

const Others = () => {
  return (
    <div
      style={{
        marginTop: "100px",
      }}
    >
      <TodoList todoTypeIs={"Others"} />
    </div>
  );
};

export default Others;
