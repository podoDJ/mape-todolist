import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateTodos } from "../../api/todos";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useLocation } from "react-router-dom";

const UpdateComp = () => {
  const item = useLocation().state.item
  console.log("수정페이지 item=>",item)
  const [title, setTitle] = useState(item.title);
  const postDate = new Date(item.postDate)
  const [todoType, setTodoType] = useState(item.todoType);
  const [todoFreq, setTodoFreq] = useState(item.todoFreq);
  const [dueDate, setDueDate] = useState(new Date(item.dueDate));
  const [content, setContent] = useState(item.content);
  const [estTime, setEstTime] = useState(item.estTime);

  const inputChangeHandler = (event, setState) => {
    setState(event.target.value);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(updateTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("데이터 업데이트 성공!!")
    }
  })


  const inputSubmitHandler = (event) => {
    event.preventDefault();
    if (!window.confirm("숙제를 수정하시겠어요?")) {
      alert("등록을 취소했습니다!!!");
    } else {
      const updatedTodo = {
        id: item.id,
        postDate,
        title,
        dueDate,
        todoType,
        todoFreq,
        content,
        estTime,
        isDone: false,
      };
      mutation.mutate(item.id, updatedTodo);
      console.log("updatedTodo=>",updatedTodo)
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

export default UpdateComp