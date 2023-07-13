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
    <div>
      <form onSubmit={(event) => inputSubmitHandler(event)}>
        <section>
          <label>제목</label>
          <input
            value={title}
            maxLength={TITLE_MAX_LENGTH}
            onChange={(event) => {
              inputLimitHandler(event, setTitle);
              inputCountHandler(event, setTitleInputCount);
            }}
          />{" "}
        </section>
        <span>
          {titleInputCount}/{TITLE_MAX_LENGTH}자
        </span>
        <section>
          {/* 달력 https://github.com/wojtekmaj/react-datetime-picker#readme */}
          <label>완료일</label>
          <div className="p-5">
            <DateTimePicker value={dueDate} onChange={setDueDate} disableClock={true} clearIcon={null} />
          </div>
        </section>
        <section>
          <label>종류</label>
          <div>
            <label>보스</label>
            <input type="radio" value={"Boss"} checked={todoType === "Boss"} onChange={(event) => inputChangeHandler(event, setTodoType)} />
            <label>퀘스트</label>
            <input type="radio" value={"Quest"} checked={todoType === "Quest"} onChange={(event) => inputChangeHandler(event, setTodoType)} />
            <label>기타</label>
            <input type="radio" value={"Others"} checked={todoType === "Others"} onChange={(event) => inputChangeHandler(event, setTodoType)} />
          </div>
        </section>
        <section>
          <label>일간/주간</label>
          <div>
            <label>일간</label>
            <input type="radio" value={"Daily"} checked={todoFreq === "Daily"} onChange={(event) => inputChangeHandler(event, setTodoFreq)} />
            <label>주간</label>
            <input type="radio" value={"Weekly"} checked={todoFreq === "Weekly"} onChange={(event) => inputChangeHandler(event, setTodoFreq)} />
            <label>기타</label>
            <input type="radio" value={"Others"} checked={todoFreq === "Others"} onChange={(event) => inputChangeHandler(event, setTodoFreq)} />
          </div>
        </section>
        <section>
          <label>내용</label>
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
        </section>
        <section>
          <label>예상소요시간</label>
          <input type="number" min="0" value={estTime} onChange={(event) => inputChangeHandler(event, setEstTime)} />
          <span>분</span>
        </section>
        <ButtonCtn backgroundColor="var(--color-box1)" color="white" size="small">등록하기</ButtonCtn>
      </form>
    </div>
  );
};

export default InputComp;
