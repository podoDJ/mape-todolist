import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateTodos } from "../../api/todos";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { ButtonCtn } from "../common/Buttons";

const UpdateComp = ({ item }) => {
  const [title, setTitle] = useState(item.title);
  const postDate = new Date(item.postDate);
  const [todoType, setTodoType] = useState(item.todoType);
  const [todoFreq, setTodoFreq] = useState(item.todoFreq);
  const [dueDate, setDueDate] = useState(new Date(item.dueDate));
  const [content, setContent] = useState(item.content);
  const [estTime, setEstTime] = useState(item.estTime);

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

  const queryClient = useQueryClient();

  const mutation = useMutation(updateTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("데이터 업데이트 성공!!");
    },
  });

  const inputSubmitHandler = async (event) => {
    event.preventDefault();
    if (title && todoType && todoFreq && dueDate && content && estTime) {
      if (!window.confirm("숙제를 수정하시겠어요?")) {
        alert("등록을 취소했습니다!!!");
      } else {
        const updatedTodo = {
          id: item.id,
          postDate: postDate,
          title: title,
          dueDate: dueDate,
          todoType: todoType,
          todoFreq: todoFreq,
          content: content,
          estTime: estTime,
          isDone: item.isDone
        };
        await mutation.mutate({ id: item.id, updatedTodo });
        // mutation.mutate(item.id, updatedTodo);
        // 문제점 발견 : 주석처리한 방식대로 하면 todos.js에서 updatedTodo가 undefined가 됨.
        // GPT한테 왜 그런지 물어봤는데, useMutation 훅은 하나의 인자만 받는데. 그래서 쉼표로 저렇게 하면 안된데.
        // 아니 근데 화나내?? 배열로 넘겨줬을때는 왜 인덱스로 읽을려니까 못읽었냐???? 아침에 실험하고 물어보자. ==> 배열로 해도 되네?? 아니 어제 뭘 잘못 설정한거지???
        // 어쨌든 그래서 객체로 묶어서 떤져주고, 저쪽에서 인자 받을 때 구조분해할당 때려서 인자를 받아먹은거임.
        await window.location.reload();
      }
    }
  };

  // const contentLimitHandler = (event) => {
  //   event.target.value.length <= CONTENT_MAX_LENGTH ? setInputState(event.target.value) : alert(`글자수 제한 ${CONTENT_MAX_LENGTH}자 입니다.`)
  // }

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
          />
          <span>
            {titleInputCount}/{TITLE_MAX_LENGTH}자
          </span>
        </section>
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
          </span>
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

export default UpdateComp;
