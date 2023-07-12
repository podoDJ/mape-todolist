import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useMutation, useQueryClient } from "react-query";
import { addUsers } from "../../api/users";

const RegisterComp = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation(addUsers, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      console.log("신규 회원 가입 & 데이터 최신화 성공!!!");
    },
    onError: () => alert("죄송합니다. 현재 서버가 불안정한 상태입니다. 최대한 빠르게 복구하겠습니다."),
  });

  // const [email, setEmail] = useState("");
  // const [pw, setPw] = useState("");

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    pw: "",
    phone: "",
    registerDate: new Date(),
    charName: "",
    charClass: "",
    charLevel: "",
    unionLevel: "",
    isLogin: false,
  });

  const inputChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value, isLogin: true };
    });
  };

  const registerFunc = async () => {
    try {
      const email = userInput.email;
      const pw = userInput.pw;
      const userCredential = await createUserWithEmailAndPassword(auth, email, pw);
      console.log("userCredential==>", userCredential);
    } catch (err) {
      console.log("파이어베이스 에러");
    }
  };

  const inputSubmitHandler = async (event) => {
    event.preventDefault();
    if (!window.confirm("회원가입을 진행하시겠습니까?")) {
      alert("회원가입을 취소했습니다!!!");
    } else {
      const newUser = userInput;
      await mutation.mutate(newUser);
      alert("회원가입을 완료했습니다!");
      // navigate("/");
      // window.location.reload();
    }
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          registerFunc();
          inputSubmitHandler(event);
        }}
      >
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

export default RegisterComp;
