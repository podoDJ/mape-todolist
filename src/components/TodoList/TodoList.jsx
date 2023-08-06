import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTodos, getTodos, updateTodos } from "../../api/todos";
import Countdown from "../common/Countdown";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import InputComp from "../InputComp/InputComp";
import { ButtonCtn } from "../common/Buttons";
import { GoTriangleRight, GoTriangleLeft } from "react-icons/go";

export const DateReform = (date) => {
  return `${date.slice(0, 10)}  ${date.slice(11, 13)} : ${date.slice(14, 16)} : ${date.slice(17, 19)}`;
};

const TodoList = ({ todoTypeIs }) => {
  const navigate = useNavigate();

  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [doneListModalOpen, setDoneListModalOpen] = useState(false);
  const [doneListModalOpenBtn, setDoneListModalOpenBtn] = useState(false);
  console.log("doneListModalOpenBtn=>", doneListModalOpenBtn);
  const openModal = (setState) => {
    setState(true);
  };
  const closeModal = (setState) => {
    setState(false);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(deleteTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("데이터 삭제 완료.");
    },
  });
  const mutationIsDone = useMutation(updateTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("완료여부 변경 성공.");
    },
  });

  const { isLoading, isError, data } = useQuery("todos", getTodos);
  if (isLoading) {
    return <h1>로딩중입니다. 잠시만 기다려주세요!!</h1>;
  }
  if (isError) {
    return <h1>데이터 Get오류가 발생했습니다!!</h1>;
  }
  const deleteTodoHandler = (id) => {
    mutation.mutate(id);
  };
  const updateIsDoneHandler = (id, itemIsDone) => {
    const updatedTodo = { isDone: !itemIsDone };
    mutationIsDone.mutate({ id: id, updatedTodo });
  };

  // const sortUrgentData = data?.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate) || []);
  let sortUrgentData = [];
  const menuFilter = (todoTypeIs) => {
    if (todoTypeIs === "All") {
      sortUrgentData = data?.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate) || []);
      return sortUrgentData;
    } else {
      sortUrgentData = data?.filter((item) => item.todoType === todoTypeIs).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate) || []);
    }
  };
  menuFilter(todoTypeIs);
  

  const TypeReform = (type) => {
    switch (type) {
      case "Boss":
        return "보스";
      case "Quest":
        return "퀘스트";
      case "Others":
        return "기타";
      case "Daily":
        return "Daily";
      case "Weekly":
        return "Weekly";
      default:
        break;
    }
  };
  return (
    <>
      <ButtonCtn
        backgroundColor="var(--color-box1)"
        color="white"
        size="write-button"
        onClick={() => {
          openModal(setInputModalOpen);
          openModal(setDoneListModalOpenBtn);
          closeModal(setDoneListModalOpen);
        }}
      >
        새 글쓰기
      </ButtonCtn>
      <div>
        {inputModalOpen && (
          <S.ModalBox
            onClick={() => {
              closeModal(setInputModalOpen);
              closeModal(setDoneListModalOpenBtn);
            }}
          >
            <S.ModalCtn onClick={(event) => event.stopPropagation()}>
              <InputComp />
              <button onClick={() => closeModal(setInputModalOpen)}>닫는버튼</button>
            </S.ModalCtn>
          </S.ModalBox>
        )}
      </div>
      <S.pageCtn>
        {sortUrgentData
          ?.filter((item) => item.isDone === false)
          .map((item) => {
            return (
              <S.CardBox key={item.id}>
                <div>
                  <S.UlCtn>
                    <S.Ul bc="var(--color-box1)">{TypeReform(item.todoType)}</S.Ul>
                    <S.Ul bc="var(--color-box3)">{TypeReform(item.todoFreq)}</S.Ul>
                    <S.Ul bc="none" border="1px solid red" fc="black" fontsize="12px" padding="10px">
                      <Countdown dueDate={item.dueDate} />
                    </S.Ul>
                  </S.UlCtn>
                  {/* <S.UlCtn> */}
                  <S.Ul bc="var(--color-box2)" fc="black">
                    {item.title}
                  </S.Ul>
                  <S.Ul bc="var(--color-box2)" fc="black">
                    {item.content.length > 20 ? `${item.content.slice(0, 20)}...` : item.content}
                  </S.Ul>
                  <S.Ul bc="var(--color-box2)" fc="black">
                    등록: {DateReform(item.postDate)}
                  </S.Ul>
                  <S.Ul bc="var(--color-box2)" fc="black">
                    마감: {DateReform(item.dueDate)}
                  </S.Ul>
                  <S.Ul bc="var(--color-box2)" fc="black">
                    예상시간: {item.estTime}분
                  </S.Ul>
                  {/* </S.UlCtn> */}
                  {/* <p>숙제: {item.title}</p>
                  <p>등록: {DateReform(item.postDate)}</p>
                  <p>마감: {DateReform(item.dueDate)}</p>
                  상태: <Countdown dueDate={item.dueDate} />
                  <p>내용: </p>
                  <p>예상시간: {item.estTime}분</p>
                  <p>isDone: {item.isDone.toString()}</p> */}
                </div>
                <S.CardBoxBtnCtn>
                  <ButtonCtn backgroundColor="var(--color-box1)" color="white" size="card-button" onClick={() => deleteTodoHandler(item.id)}>
                    삭제하기
                  </ButtonCtn>
                  <ButtonCtn backgroundColor="var(--color-box2)" color="white" size="card-button" onClick={() => updateIsDoneHandler(item.id, item.isDone)}>
                    완료하기
                  </ButtonCtn>
                  <ButtonCtn backgroundColor="var(--color-box3)" color="white" size="card-button" onClick={() => navigate(`/detail/${item.id}`, { state: { id: item.id } })}>
                    상세보기
                  </ButtonCtn>
                </S.CardBoxBtnCtn>
              </S.CardBox>
            );
          })}

        <div>
          {doneListModalOpen && (
            <S.DoneModalBox>
              <S.DoneText>『완료목록』</S.DoneText>
              <S.DoneModalCloseBtn
                onClick={() => {
                  closeModal(setDoneListModalOpen);
                  closeModal(setDoneListModalOpenBtn);
                }}
              >
                <GoTriangleRight size="50" />
              </S.DoneModalCloseBtn>
              {sortUrgentData
                ?.filter((item) => item.isDone === true)
                .map((item) => {
                  return (
                    <S.DoneModalCtn key={item.id} onClick={(event) => event.stopPropagation()}>
                      <div>
                        <div>제목: {item.title}</div>
                        <div>마감일: {DateReform(item.dueDate)}</div>
                        <div>완료여부: {item.isDone.toString()}</div>
                      </div>
                      <S.DoneModalBtnCtn>
                        <ButtonCtn backgroundColor="var(--color-box1)" color="white" size="card-button" onClick={() => deleteTodoHandler(item.id)}>
                          삭제하기
                        </ButtonCtn>
                        <ButtonCtn backgroundColor="var(--color-box2)" color="white" size="card-button" onClick={() => updateIsDoneHandler(item.id, item.isDone)}>
                          완료취소
                        </ButtonCtn>
                        <ButtonCtn backgroundColor="var(--color-box3)" color="white" size="card-button" onClick={() => navigate(`/detail/${item.id}`, { state: { id: item.id } })}>
                          상세보기
                        </ButtonCtn>
                      </S.DoneModalBtnCtn>
                    </S.DoneModalCtn>
                  );
                })}
            </S.DoneModalBox>
          )}
        </div>
      </S.pageCtn>
      <S.DoneModalOpenBtn
        display={doneListModalOpenBtn}
        onClick={() => {
          openModal(setDoneListModalOpen);
          openModal(setDoneListModalOpenBtn);
        }}
      >
        <GoTriangleLeft size="50" />
      </S.DoneModalOpenBtn>
    </>
  );
};

export default TodoList;

const S = {
  pageCtn: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(150px, auto);
    grid-gap: 10px;

    justify-content: center;
  `,
  CardBox: styled.div`
    border: 3px solid var(--color-box3);
    padding: 10px;
    margin: 10px;

  `,
  UlCtn: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  `,
  Ul: styled.ul`
    margin: 0.5rem 0;
    text-align: center;
    align-items: center;
    padding: ${(props) => (props.padding ? props.padding : "10px")};
    border: ${(props) => (props.border ? props.border : "none")};
    border-radius: 10px;
    background-color: ${(props) => props.bc};
    color: ${(props) => (props.fc ? props.fc : "white")};
    font-size: ${(props) => (props.fontsize ? props.fontsize : "15px")};
    font-weight: bold;
    cursor: pointer;

  `,
  CardBoxBtnCtn: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  ModalBox: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-box2);
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
  DoneModalBox: styled.div`
    position: fixed;
    top: 80px;
    right: 0;
    width: 26%;
    height: 100%;
    background-color: var(--color-box2);
    animation: fadeInRight 0.1s linear;
    @keyframes fadeInRight {
      0% {
        transform: translateX(10%);
        opacity: 0;
      }
      100% {
        transform: translateX(0%);
        opacity: 1;
      }
    }
  `,
  DoneModalCtn: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;
    background-color: white;
    width: 80%;
    height: 18%;
    border-radius: 12px;
    z-index: 1;
    font-size: 18px;
  `,
  DoneModalBtnCtn: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0 1rem 2rem;
  `,
  DoneModalOpenBtn: styled.button`
    position: fixed;
    top: 50%;
    right: 5%;
    display: ${(props) => (props.display ? "none" : "flex")};
    align-items: center;
    justify-content: center;

    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: none;
    margin: 5px;
    background-color: var(--color-box1);
    cursor: pointer;
  `,
  DoneModalCloseBtn: styled.button`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: none;
    margin: 5px;
    background-color: white;
    cursor: pointer;
  `,
  DoneText: styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    background-color: white;
    color: black;
    border-radius: 15px;
    font-size: 18px;
    font-weight: bold;
    width: 10rem;
    height: 2rem;
  `,
  Span: styled.span`
    padding: 10px;
    border-radius: 10px;
    background-color: var(--color-box1);
    color: white;
    font-weight: bold;
    cursor: pointer;
  `,
};
