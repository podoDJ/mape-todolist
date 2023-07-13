import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ButtonCtn } from "../common/Buttons";
import { styled } from "styled-components";
//참고사이트 : https://velog.io/@dev-hannahk/react-firebase-crud
const LoginComp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const loginFunc = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pw);
      console.log("userCredential => ", userCredential);

      const user = userCredential.user;
      // 로그인 시 토큰을 받아 세션스토리지에 저장
      const token = await user.getIdToken();
      await sessionStorage.setItem("token", token);
      await window.location.reload();
    } catch (error) {
      console.log("로그인 인증 에러 발생");
    }
  };

  return (
    <div>
      <S.LoginCtn onSubmit={(event) => loginFunc(event)}>
        <S.BackgroundImage src="https://blog.kakaocdn.net/dn/dV7oe8/btqFT7M2dgc/NWoPCKWneiT0nrsYcvKsRK/img.jpg" />
        {/* <S.BackgroundImage top={"60%"} left={"55%"}src="https://i.namu.wiki/i/ju_RitBeEGpto8ouX-53lNMDS_zqa5HB3up0e9O4wlhaviQDrT1xYjn2YlKpqc0z0soEFQx4EwyXNkHY9sFAZmQeMMCxIFX-m1iO3F6OSbjKBg-cEytkIgHTsjdvjz_xZqL2b03pEBVLSKRlRyVriA.webp" /> */}
        <div>
          <S.Label>이메일</S.Label>
          <S.Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>

        <div>
          <S.Label>패스워드</S.Label>
          <S.Input type="password" value={pw} onChange={(event) => setPw(event.target.value)} />
        </div>
        <ButtonCtn backgroundColor="var(--color-box1)" color="white" size="medium">
          로그인
        </ButtonCtn>
      </S.LoginCtn>
    </div>
  );
};

export default LoginComp;

const S = {
  LoginCtn: styled.form`
    width: 80%;
    height: 40rem;
    border: 2px solid var(--color-box1);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10rem auto 0;
  `,
  BackgroundImage: styled.img`
    position: absolute;
    top: 48%;
    left: 50%;
    width: 50%;
    height: 67%;
    transform: translate(-50%, -50%);
    /* object-fit: cover; */
    z-index: -1;
  `,
  Label: styled.label`
    padding: 10px;
    border-radius: 10px;
    background-color: white;
  `,
  Input: styled.input`
    width: 20rem;
    height: 1.5rem;
    margin: 1rem;
    font-size: 16px;
    padding: 0px 2px;
  `,
};
