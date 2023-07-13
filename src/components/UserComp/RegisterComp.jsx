import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useMutation, useQueryClient } from "react-query";
import { addUsers } from "../../api/users";
import { ButtonCtn } from "../common/Buttons";

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

  const registerFunc = async (event) => {
    event.preventDefault();
    if (!window.confirm("회원가입을 진행하시겠습니까?")) {
      alert("회원가입을 취소했습니다!!!");
    } else {
      try {
        const email = userInput.email;
        const pw = userInput.pw;
        const userCredential = await createUserWithEmailAndPassword(auth, email, pw);

        // 회원가입하면 자동 로그인이 되므로 미리 토큰을 받아 세션스토리지에 저장
        const user = userCredential.user;
        const token = await user.getIdToken();
        sessionStorage.setItem("token", token);

          const newUser = {
            id: auth.currentUser.uid ? auth.currentUser.uid : "작성자 uid 오류",
            name: userInput.name,
            email: userInput.email,
            pw: userInput.pw,
            phone: userInput.phone,
            registerDate: new Date(),
            charName: userInput.charName,
            charClass: userInput.charClass,
            charLevel: userInput.charLevel,
            unionLevel: userInput.unionLevel,
          };
          await mutation.mutate(newUser);
          alert("회원가입을 완료했습니다!");
          await navigate("/")
          await window.location.reload();
      } catch (err) {
        console.log("파이어베이스 에러");
      }
    }
  };
  return (
    <div>
      <form
        onSubmit={registerFunc}>
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
          <input type="password" placeholder="비밀번호는 6자리 이상으로 정햊쉐요!" name="pw" onChange={(event) => inputChangeHandler(event)} />
        </section>
        <section>
          <label>핸드폰 번호</label>
          <input name="phone" placeholder="대쉬(-)없이 번호만 적어주세요!" onChange={(event) => inputChangeHandler(event)} />
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
          <input type="number" placeholder="모든 캐릭터들의 레벨 합이에요!!" name="unionLevel" onChange={(event) => inputChangeHandler(event)} />
        </section>
        <ButtonCtn backgroundColor="var(--color-box1)" color="white" size="large">등록하기</ButtonCtn>
      </form>
    </div>
  );
};
export default RegisterComp;
