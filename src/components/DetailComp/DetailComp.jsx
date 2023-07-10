import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Countdown from "../common/Countdown";
import { deleteTodos } from "../../api/todos";

const DetailComp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const item = useLocation().state.item
  // 질문 : useNavigate으로 state를 넘길 때, 클릭한 녀석의 state전체를 넘김.
  // 내가 생각한 장점은 전체 todos를 필터링 할 필요가 없다는 것이었음.
  // 그런데 진짜 유의미한건가????
  console.log("location=>", location)
  
  const queryClient = useQueryClient()

  const mutation = useMutation(deleteTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos")
      console.log("데이터 삭제 완료.")
    }
  })

  const deleteTodoHandler = (id) => {
    mutation.mutate(id)
    navigate("/")
    window.location.reload()
  }

  return (
    <S.Page>
      <S.Container>
        <S.Form>
          <label>체크박스</label>
          <input type="checkbox" />
        </S.Form>
        <S.DetailFreq>일일/주간{item.todoFreq}</S.DetailFreq>
        <S.DetailTitle><p>제목: {item.title}</p></S.DetailTitle>
        <S.DetailDate>
          <Countdown dueDate = { item.dueDate }/>
          <p>등록일{item.postDate}</p>
          <p>마감일{item.dueDate}</p>
        </S.DetailDate>

        <S.DetailBody>
        <p>내용: {item.content}</p>
        </S.DetailBody>
        <S.DeleteBtn onClick = {() => deleteTodoHandler(item.id)}>삭제</S.DeleteBtn>
        <S.DoneBtn>완료</S.DoneBtn>
        <S.UpdateBtn onClick = {() => navigate(`/update/${item.id}`, {state: {item: item,},})}>수정</S.UpdateBtn>
      </S.Container>
    </S.Page>
  );
};

export default DetailComp;
// 나중에 grid로 싹다 갈아엎기
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
`
};
