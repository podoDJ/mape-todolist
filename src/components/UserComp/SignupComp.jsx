import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addUsers } from "../../api/users";
import shortid from "shortid";
import { useNavigate } from "react-router-dom";

const SignupComp = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(addUsers, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      console.log("신규 회원 가입 & 데이터 최신화 성공!!!");
    },
    onError: () => alert("죄송합니다. 현재 서버가 불안정한 상태입니다. 최대한 빠르게 복구하겠습니다."),
  });

  const [userInput, setUserInput] = useState({
    id: shortid.generate(),
    name: "",
    email: "",
    pw: "",
    phone: "",
    signupDate: new Date(),
    charName: "",
    charClass: "",
    charLevel: "",
    unionLevel: "",
    isLogin: false,
  });
  console.log("userInput=>",userInput)
  const inputChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value, isLogin: true };
    });
  };

  const inputSubmitHandler = (event) => {
    event.preventDefault();
    if (!window.confirm("회원가입을 진행하시겠습니까?")) {
      alert("회원가입을 취소했습니다!!!");
    } else {
      const newUser = userInput;
      mutation.mutate(newUser);
      alert("회원가입을 완료했습니다!");
      navigate("/");
      window.location.reload();
    }
  };
  return (
    <div>
      <form onSubmit={inputSubmitHandler}>
        <section>
          <label>이름</label>
          <input name="name" onChange={(event) => inputChangeHandler(event)} />
        </section>
        <section>
          <label>이메일</label>
          <input name="email" onChange={(event) => inputChangeHandler(event)} />
        </section>
        <section>
          <label>패스워드</label>
          <input type="password" name="pw" onChange={(event) => inputChangeHandler(event)} />
        </section>
        <section>
          <label>핸드폰 번호</label>
          <input name="phone" onChange={(event) => inputChangeHandler(event)} />
        </section>
        <section>
          <label>캐릭터 닉네임</label>
          <input name="charName" onChange={(event) => inputChangeHandler(event)} />
        </section>
        <section>
          <label>캐릭터 직업</label>
          <input name="charClass" onChange={(event) => inputChangeHandler(event)} />
        </section>
        <section>
          <label>캐릭터 레벨</label>
          <input type="number" name="charLevel" onChange={(event) => inputChangeHandler(event)} />
        </section>
        <section>
          <label>유니온 레벨</label>
          <input type="number" name="unionLevel" onChange={(event) => inputChangeHandler(event)} />
        </section>
        <button>등록하기</button>
      </form>
    </div>
  );
};

export default SignupComp;
