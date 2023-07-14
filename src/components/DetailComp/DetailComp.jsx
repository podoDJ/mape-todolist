import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { deleteTodos, getTodos, updateTodos } from "../../api/todos";
import Countdown from "../common/Countdown";
import UpdateComp from "../UpdateComp/UpdateComp";
import { DateReform } from "../TodoList/TodoList";

const DetailComp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location=>", location.state.id)
  const detailId = location.state?.id ? location.state.id : "";
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(deleteTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("데이터 삭제 완료.");
    },
    onError: () => {
      console.log("상세보기 삭제 문제발생");
    },
  });

  const mutationIsDone = useMutation(updateTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("완료여부 변경 성공.");
    },
  });

  const deleteTodoHandler = (id) => {
    if (!item || !item.id) {
      return;
    }
    mutation.mutate(id);
    navigate("/");
  };

  const updateIsDoneHandler = (id, itemIsDone) => {
    const updatedTodo = { isDone: !itemIsDone };
    mutationIsDone.mutate({ id: id, updatedTodo });
  };
  const alertCheckbox = () => {
    alert("아직 이 부분 구현 못했어요!!")
  }

  const { isLoading, isError, data } = useQuery("todos", getTodos);
  if (isLoading) {
    return <h1>상세보기 로딩중입니다. 잠시만 기다려주세요!</h1>;
  }
  if (isError) {
    return <h1>상세보기 오류 발생!!</h1>;
  }

  const item = data.find((d) => d.id === detailId) ? data.find((d) => d.id === detailId) : null;

  return (
    <>
      <div>
        {isOpen && (
          <S.ModalBox onClick={closeModal}>
            <S.ModalCtn onClick={(event) => event.stopPropagation()}>
              <UpdateComp item={item ? item : null} closeModal={closeModal} />
              <button onClick={closeModal}>닫는버튼</button>
            </S.ModalCtn>
          </S.ModalBox>
        )}
      </div>
      <S.Page>
        <S.Container>
          <S.Form>
            <label>체크박스</label>
            <input type="checkbox" onClick={()=>alertCheckbox()} />
          </S.Form>
          <S.DetailFreq>{item?.todoFreq}</S.DetailFreq>
          <S.DetailTitle>
            <p>{item?.title}</p>
          </S.DetailTitle>
          <S.DetailDate>
            <Countdown dueDate={item?.dueDate} />
            <div>등록: {DateReform(item?.postDate)}</div>
            <div>마감: {DateReform(item?.dueDate)}</div>
          </S.DetailDate>

          <S.DetailBody>
            {item?.content}
          </S.DetailBody>
          <S.DeleteBtn onClick={() => deleteTodoHandler(item?.id)}>삭제</S.DeleteBtn>
          <S.DoneBtn onClick={() => updateIsDoneHandler(item?.id, item?.isDOne)}>완료</S.DoneBtn>
          <S.UpdateBtn onClick={openModal}>수정</S.UpdateBtn>
        </S.Container>
      </S.Page>
    </>
  );
};

export default DetailComp;

const S = {
  Page: styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    
  `,

  Container: styled.div`
    width: 100%;
    height: 50rem;
    border: 3px solid var(--color-box1);
    border-radius: 15px;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(14, 1fr);
    gap: 10px;
  `,
  Form: styled.form`
    grid-column-start: 10;
    grid-column-end: 10;
  `,
  DetailFreq: styled.div`
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 4;
    border: 3px solid var(--color-box1);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  DetailTitle: styled.div`
    grid-column-start: 3;
    grid-column-end: 8;
    grid-row-start: 2;
    grid-row-end: 4;
    border: 3px solid var(--color-box1);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
  `,
  DetailDate: styled.div`
    grid-column-start: 8;
    grid-column-end: 10;
    grid-row-start: 2;
    grid-row-end: 4;
    border: 3px solid var(--color-box1);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  `,
  DetailBody: styled.div`
    grid-column-start: 2;
    grid-column-end: 10;
    grid-row-start: 4;
    grid-row-end: 13;
    font-size: 20px;
    
    line-height: 40px;
    padding: 30px;
    border: 3px solid var(--color-box1);
    border-radius: 15px;
  `,
  DeleteBtn: styled.button`
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 13;
    grid-row-end: 13;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    background-color: var(--color-box1);
    color: white;
  `,
  DoneBtn: styled.button`
    grid-column-start: 3;
    grid-column-end: 3;
    grid-row-start: 13;
    grid-row-end: 13;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    background-color: var(--color-box2);
    color: white;
  `,
  UpdateBtn: styled.button`
    grid-column-start: 9;
    grid-column-end: 9;
    grid-row-start: 13;
    grid-row-end: 13;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    background-color: var(--color-box3);
    color: white;
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
    animation: colorChange 0.4 linear;
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
    animation: dropTop 0.4s linear;
    @keyframes dropTop {
      0% {
        transform: translateY(-30%);
        opacity: 0;
      }
      100% {
        transform: translateY(0%);
        opacity: 1;
      }
    }
  `,
};
