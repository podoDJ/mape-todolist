import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ButtonCtn } from "../common/Buttons";
//참고사이트 : https://velog.io/@dev-hannahk/react-firebase-crud
const LoginComp = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const loginFunc = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pw);
      console.log("userCredential => ", userCredential);

      const user = userCredential.user
      // 로그인 시 토큰을 받아 세션스토리지에 저장
      const token = await user.getIdToken();
      await sessionStorage.setItem("token", token)
      await window.location.reload()
    } catch (error) {
      console.log("로그인 인증 에러 발생");
    }
    
  };
  
  return (
    <>
      <div>
        <form onSubmit={(event) => loginFunc(event)}>
          <label>이메일</label>
          <input value={email} onChange={(event) => setEmail(event.target.value)} />
          <label>패스워드</label>
          <input type="password" value={pw} onChange={(event) => setPw(event.target.value)} />
          <ButtonCtn backgroundColor="var(--color-box1)" color="white" size="medium">로그인</ButtonCtn>
        </form>
      </div>
    </>
  );
};

export default LoginComp;
