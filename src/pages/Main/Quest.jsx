import React from "react";
import TodoList from "../../components/TodoList/TodoList";

const Quest = () => {
  return (
    <div
      style={{
        marginTop: "100px",
      }}
    >
      <TodoList todoTypeIs={"Quest"} />
    </div>
  );
};

export default Quest;
