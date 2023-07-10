import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addTodos } from "../../api/todos";
import shortid from "shortid";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const InputComp = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(addTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("데이터 최신화 성공!!");
    },
  });

  const [title, setTitle] = useState("");
  const postDate = new Date()
  const [todoType, setTodoType] = useState("");
  const [todoFreq, setTodoFreq] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [content, setContent] = useState("");
  const [estTime, setEstTime] = useState(0);

  const inputChangeHandler = (event, setState) => {
    setState(event.target.value);
  };

  const inputSubmitHandler = (event) => {
    event.preventDefault();
    if (!window.confirm("숙제를 등록하시겠어요?")) {
      alert("등록을 취소했습니다!!!");
    } else {
      const newTodo = {
        id: shortid.generate(),
        postDate,
        title,
        dueDate,
        todoType,
        todoFreq,
        content,
        estTime,
        isDone: false,
      };
      mutation.mutate(newTodo);
    }
  };

  return (
    <div>
      <form onSubmit={inputSubmitHandler}>
        <section>
          <label>제목</label>
          <input value={title} onChange={(event) => inputChangeHandler(event, setTitle)} />
        </section>
        <section>
          {/* 달력 https://github.com/wojtekmaj/react-datetime-picker#readme */}
          <label>완료일</label>
          <div className='p-5'>

            <DateTimePicker value={dueDate} onChange={setDueDate} disableClock = { true } isCalendarOpen = { true } clearIcon= { null }/>
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
          <textarea value={content} onChange={(event) => inputChangeHandler(event, setContent)} />
        </section>
        <section>
          <label>예상소요시간</label>
          <input type="number" min="0" value={estTime} onChange={(event) => inputChangeHandler(event, setEstTime)} />
          <span>분</span>
        </section>
        <button>등록하기</button>
      </form>
    </div>
  );
};

export default InputComp;
