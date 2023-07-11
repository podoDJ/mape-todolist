import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTodos, getTodos } from "../../api/todos";
import Countdown from "../common/Countdown";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import InputComp from "../InputComp/InputComp";

const TodoList = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  // useEffect(() => {
  //   setIsOpen
  // }, [openModal, closeModal])

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
    return <h1>데이터 Get오류가 발생했습니다!!</h1>;
  }
  const deleteTodoHandler = (event, id) => {
    event.stopPropagation();
    mutation.mutate(id);
  };

  const sortUrgentData = data?.sort((a, b) => (new Date(a.dueDate) - new Date(b.dueDate)))

  return (
    <>
      <div>
        <button onClick={openModal}>여는버튼</button>

        {isOpen && (
          <S.ModalBox onClick={closeModal}>
            <S.ModalCtn onClick={(event) => event.stopPropagation()}>
              <InputComp/>
              <button onClick={closeModal}>닫는버튼</button>
            </S.ModalCtn>
          </S.ModalBox>
        )}
      </div>

      <div>
        {sortUrgentData?.map((item) => {
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
              <button onClick={() => navigate(`/${item.id}`, { state: { id: item.id } })}>상세보기(임시)</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TodoList;

const S = {
  ModalBox: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #999999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: colorChange 0.5s linear;
    @keyframes colorChange {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

  `,
  ModalCtn: styled.div`
  margin-top: 1rem;
    background-color: white;
    padding: 20px;
    width: 25%;
    height: 70%;
    border-radius: 12px;
    z-index: 1;
    animation: dropTop 0.5s linear;
    @keyframes dropTop {
      0% {
        transform: translateY(-20%);
        opacity: 0;
      }
      100% {
        transform: translateY(0%);
        opacity: 1;
      }
    }
  `,
};
