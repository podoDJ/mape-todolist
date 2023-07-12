import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Countdown from "../common/Countdown";
import { deleteTodos, getTodos } from "../../api/todos";
import UpdateComp from "../UpdateComp/UpdateComp";


const DetailComp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const detailId = location.state.id
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
  });

  const deleteTodoHandler = (id) => {
    mutation.mutate(id);
    navigate("/");
  };

  const { isLoading, isError, data } = useQuery("todos", getTodos);
  if (isLoading) {
    return <h1>상세보기 로딩중입니다. 잠시만 기다려주세요!!!</h1>;
  }
  if (isError) {
    return <h1>오류가 발생했습니다!!</h1>;
  }

  const item = data?.find((d) => d.id === detailId)
  console.log("item==>",item)

  return (
    <>
      <div>
        {isOpen && (
          <S.ModalBox onClick={closeModal}>
            <S.ModalCtn onClick={(event) => event.stopPropagation()}>
              <UpdateComp item={item} closeModal={closeModal} />
              <button onClick={closeModal}>닫는버튼</button>
            </S.ModalCtn>
          </S.ModalBox>
        )}
      </div>
      <S.Page>
        <S.Container>
          <S.Form>
            <label>체크박스</label>
            <input type="checkbox" />
          </S.Form>
          <S.DetailFreq>일일/주간{item.todoFreq}</S.DetailFreq>
          <S.DetailTitle>
            <p>제목: {item.title}</p>
          </S.DetailTitle>
          <S.DetailDate>
            <Countdown dueDate={item.dueDate} />
            <p>등록일{item.postDate}</p>
            <p>마감일{item.dueDate}</p>
          </S.DetailDate>

          <S.DetailBody>
            <p>내용: {item.content}</p>
          </S.DetailBody>
          {/* <S.DeleteBtn onClick={() => deleteTodoHandler(item.id)}>삭제</S.DeleteBtn> */}
          <S.DoneBtn>완료</S.DoneBtn>
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
  `,

  Container: styled.div`
    width: 100%;
    height: 50rem;
    border: 1px solid black;
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
    border: 1px solid black;
  `,
  DetailTitle: styled.div`
    grid-column-start: 3;
    grid-column-end: 9;
    grid-row-start: 2;
    grid-row-end: 4;
    border: 1px solid black;
  `,
  DetailDate: styled.div`
    grid-column-start: 9;
    grid-column-end: 9;
    grid-row-start: 2;
    grid-row-end: 4;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  `,
  DetailBody: styled.div`
    grid-column-start: 2;
    grid-column-end: 10;
    grid-row-start: 4;
    grid-row-end: 13;
    border: 1px solid black;
  `,
  DeleteBtn: styled.button`
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 13;
    grid-row-end: 13;
  `,
  DoneBtn: styled.button`
    grid-column-start: 3;
    grid-column-end: 3;
    grid-row-start: 13;
    grid-row-end: 13;
  `,
  UpdateBtn: styled.button`
    grid-column-start: 9;
    grid-column-end: 9;
    grid-row-start: 13;
    grid-row-end: 13;
  `,
  ModalBox: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #494949;
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
