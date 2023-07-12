import React, { useState } from "react";
import { useAuth } from "../../api/AuthContex";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
//참고사이트 : https://velog.io/@dev-hannahk/react-firebase-crud
const LoginComp = () => {
  
  // const queryClient = useQueryClient();

  // const mutation = useMutation(addLogins, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("logins");
  //     console.log("로그인 입력 완료 & 로그인 데이터 최신화 성공!");
  //   },
  //   onError: () => alert("죄송합니다. 현재 로그인 에러가 발생했습니다."),
  // });

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const loginFunc = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pw);
      console.log("userCredential => ", userCredential);
    } catch (error) {
      console.log("로그인 인증 에러 발생");
    }
  };
  const loginAddHandler = (event) => {
    loginFunc(event);
  };

  return (
    <>
      <div>
        <form onSubmit={(event) => loginFunc(event)}>
          <label>이메일</label>
          <input value={email} onChange={(event) => setEmail(event.target.value)} />
          <label>패스워드</label>
          <input value={pw} onChange={(event) => setPw(event.target.value)} />
          <button>로그인</button>
        </form>
      </div>
    </>
  );
};

export default LoginComp;
