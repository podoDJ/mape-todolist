import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addTodos } from "../../api/todos";
import shortid from "shortid";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { auth } from "../../firebase";
import { ButtonCtn } from "../common/Buttons";
import { styled } from "styled-components";

const InputComp = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(addTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("신규 포스트 입력 & 데이터 최신화 성공!!");
    },
    onError: () => alert("죄송합니다. 현재 서버가 불안정한 상태입니다. 최대한 빠르게 복구하겠습니다."),
  });

  const [title, setTitle] = useState("");
  const postDate = new Date();
  const [todoType, setTodoType] = useState("");
  const [todoFreq, setTodoFreq] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [content, setContent] = useState("");
  const [estTime, setEstTime] = useState(0);
  const authorUId = auth.currentUser.uid || "작성자 uid 오류";

  const inputChangeHandler = (event, setState) => {
    setState(event.target.value);
  };

  const [titleInputCount, setTitleInputCount] = useState(title.length);
  const [contentInputCount, setContentInputCount] = useState(content.length);
  const TITLE_MAX_LENGTH = 20;
  const CONTENT_MAX_LENGTH = 1000;

  const inputCountHandler = (event, setInputCount) => {
    setInputCount(event.target.value.length);
  };
  const inputLimitHandler = (event, setInputState) => {
    event.target.value.length <= event.target.maxLength ? setInputState(event.target.value) : setInputState(event.target.value.slice(0, event.target.maxLength));
  };

  const inputSubmitHandler = async (event) => {
    event.preventDefault();
    if (title && todoType && todoFreq && dueDate && content && estTime) {
      if (!window.confirm("숙제를 등록하시겠어요?")) {
        alert("등록을 취소했습니다!!!");
      } else {
        const newTodo = {
          id: shortid.generate(),
          authorUId,
          postDate,
          title,
          dueDate,
          todoType,
          todoFreq,
          content,
          estTime,
          isDone: false,
        };
        await mutation.mutate(newTodo);
        await window.location.reload();
      }
    } else {
      alert("모든 내용을 채워주세요!!");
    }
  };
  
  return (
      <S.LoginCtn onSubmit={(event) => inputSubmitHandler(event)}>
        <S.Section>
          <S.Label>제목</S.Label>
          <S.Input
            value={title}
            maxLength={TITLE_MAX_LENGTH}
            onChange={(event) => {
              inputLimitHandler(event, setTitle);
              inputCountHandler(event, setTitleInputCount);
            }}
          />{" "}
          <span>
          {titleInputCount}/{TITLE_MAX_LENGTH}자
        </span>
        </S.Section>
        
        <S.Section>
          {/* 달력 https://github.com/wojtekmaj/react-datetime-picker#readme */}
          <S.Label>완료일</S.Label>
          <div className="p-5">
            <DateTimePicker value={dueDate} onChange={setDueDate} disableClock={true} clearIcon={null} />
          </div>
        </S.Section>
        <S.Section>
          <S.Label>종류</S.Label>
          <S.TypeBox>
            <S.Label>보스</S.Label>
            <input type="radio" value={"Boss"} checked={todoType === "Boss"} onChange={(event) => inputChangeHandler(event, setTodoType)} />
            <S.Label>퀘스트</S.Label>
            <input type="radio" value={"Quest"} checked={todoType === "Quest"} onChange={(event) => inputChangeHandler(event, setTodoType)} />
            <S.Label>기타</S.Label>
            <input type="radio" value={"Others"} checked={todoType === "Others"} onChange={(event) => inputChangeHandler(event, setTodoType)} />
          </S.TypeBox>
        </S.Section>
        <S.Section>
          <S.Label>일간/주간</S.Label>
          <S.TypeBox>
            <S.Label>일간</S.Label>
            <input type="radio" value={"Daily"} checked={todoFreq === "Daily"} onChange={(event) => inputChangeHandler(event, setTodoFreq)} />
            <S.Label>주간</S.Label>
            <input type="radio" value={"Weekly"} checked={todoFreq === "Weekly"} onChange={(event) => inputChangeHandler(event, setTodoFreq)} />
            <S.Label>기타</S.Label>
            <input type="radio" value={"Others"} checked={todoFreq === "Others"} onChange={(event) => inputChangeHandler(event, setTodoFreq)} />
          </S.TypeBox>
        </S.Section>
        <S.Section>
          <S.Label>내용</S.Label>
          <textarea
            value={content}
            maxLength={CONTENT_MAX_LENGTH}
            onChange={(event) => {
              inputLimitHandler(event, setContent);
              inputCountHandler(event, setContentInputCount);
            }}
          />
          <span>
            {contentInputCount}/{CONTENT_MAX_LENGTH}자
          </span>{" "}
        </S.Section>
        <S.Section>
          <S.Label>예상소요시간</S.Label>
          <S.Input width="3rem" type="number" min="0" value={estTime} onChange={(event) => inputChangeHandler(event, setEstTime)} />
          <span>분</span>
        </S.Section>
        <ButtonCtn backgroundColor="var(--color-box1)" color="white" size="small">등록하기</ButtonCtn>
      </S.LoginCtn>
  );
};

export default InputComp;

const S = {
  LoginCtn: styled.form`
    width: 95%;
    height: 40rem;
    border: 2px solid var(--color-box1);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem auto 0;
  `,
    Section: styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  `,
  Label: styled.label`
    padding: 10px;
    border-radius: 10px;
    background-color: var(--color-box1);
    height: 20px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  TypeBox: styled.div`
    display: flex;
    flex-direction: row;
  `,
  Input: styled.input`
    width: ${(props) => props.width? props.width : "10rem"};
    height: 1.5rem;
    margin: 1rem;
    font-size: 16px;
    padding: 0px 10px;
    text-align: center;
    align-items: center;
  `,
}
