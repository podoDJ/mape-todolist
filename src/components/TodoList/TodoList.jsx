import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTodos, getTodos } from "../../api/todos";
import Countdown from "../common/Countdown";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const navigate = useNavigate();
  //queryClient랑 mutation 선언은 useQuery 선언보다 위에 있어야
  //Rendered more hooks than during the previous render 오류가 안 뜨더라. 근데 이게 무슨 오류냐?
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("데이터 삭제 완료.");
    },
  });

  const { isLoading, isError, data } = useQuery("todos", getTodos);
  if (isLoading) {
    return <h1>로딩중입니다. 잠시만 기다려주세요!!</h1>;
  }
  if (isError) {
    return <h1>오류가 발생했습니다!!</h1>;
  }
  const deleteTodoHandler = (event, id) => {
    event.stopPropagation();
    mutation.mutate(id);
  };

  return (
    <div>
      {data?.map((item) => {
        return (
          <div
            key={item.id}
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px",
            }}
          >
            <div>
              <p>id: {item.id}</p>
              <p>제목: {item.title}</p>
              <p>작성일: {item.postDate}</p>
              <p>완료일: {item.dueDate}</p>
              <Countdown dueDate={item.dueDate} />
              <p>종류: {item.todoType}</p>
              <p>일간/주간: {item.frequency}</p>
              <p>내용: {item.content}</p>
              <p>예상시간: {item.estTime}분</p>
              <p>isDone: {item.isDone.toString()}</p>
            </div>
            <button onClick={(event) => deleteTodoHandler(event, item.id)}>삭제하기</button>
            <button>완료하기</button>
            <button
              onClick={() =>
                navigate(`/${item.id}`, {state: {item: item,},})}>
              상세보기(임시)
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
