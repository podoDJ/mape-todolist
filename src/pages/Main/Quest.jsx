import React from "react";
import TodoList from "../../components/TodoList/TodoList";

const Quest = () => {
  return (
    <div
      style={{
        marginTop: "130px",
      }}
    >
      <TodoList todoTypeIs={"Quest"} />
    </div>
  );
};

export default Quest;
