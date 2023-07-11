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
      const  updatedTodo = {
        id: item.id,
        postDate: postDate,    
        title: title,
        dueDate: dueDate,
        todoType: todoType,
        todoFreq: todoFreq,
        content: content,
        estTime: estTime,
        isDone: false,
      };
      mutation.mutate({ id: item.id, updatedTodo});
      // mutation.mutate(item.id, updatedTodo);
      // 문제점 발견 : 주석처리한 방식대로 하면 todos.js에서 updatedTodo가 undefined가 됨.
      // GPT한테 왜 그런지 물어봤는데, useMutation 훅은 하나의 인자만 받는데. 그래서 쉼표로 저렇게 하면 안된데.
      // 아니 근데 화나내?? 배열로 넘겨줬을때는 왜 인덱스로 읽을려니까 못읽었냐???? 아침에 실험하고 물어보자. ==> 배열로 해도 되네?? 아니 어제 뭘 잘못 설정한거지???
      // 어쨌든 그래서 객체로 묶어서 떤져주고, 저쪽에서 인자 받을 때 구조분해할당 때려서 인자를 받아먹은거임.
      console.log("updatedTodo=>",updatedTodo)
    }
  };

  return (
    <div>
      <form onSubmit={(event) => inputSubmitHandler(event)}>
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