import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ButtonCtn } from "../common/Buttons";
import { styled } from "styled-components";
//참고사이트 : https://velog.io/@dev-hannahk/react-firebase-crud
const LoginComp = () => {
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
      sessionStorage.setItem("token", token);
      window.location.reload();
    } catch (error) {
      console.log("로그인 인증 에러 발생");
      alert("잘못된 이메일 또는 비밀번호입니다.");
      setEmail("")
      setPw("")
    }
  };

  return (
    <div>
      <S.LoginCtn onSubmit={(event) => loginFunc(event)}>
        
          <S.Image src="https://blog.kakaocdn.net/dn/dV7oe8/btqFT7M2dgc/NWoPCKWneiT0nrsYcvKsRK/img.jpg" />
          {/* <S.BackgroundImage top={"60%"} left={"55%"}src="https://i.namu.wiki/i/ju_RitBeEGpto8ouX-53lNMDS_zqa5HB3up0e9O4wlhaviQDrT1xYjn2YlKpqc0z0soEFQx4EwyXNkHY9sFAZmQeMMCxIFX-m1iO3F6OSbjKBg-cEytkIgHTsjdvjz_xZqL2b03pEBVLSKRlRyVriA.webp" /> */}
          <S.EmailPWBox>
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
          </S.EmailPWBox>
        
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
  Image: styled.img`
    position: absolute; 
    top: 36%;
    left: 33%;
    width: 15%;
    height: 25%;
  `,
  EmailPWBox: styled.div`
    position: fixed;
    top: 40%;
    left: 49%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Label: styled.label`
    padding: 10px;
    border-radius: 10px;
    background-color: var(--color-box1);
    color: white;
    font-weight: bold;
    cursor: pointer;
  `,
  Input: styled.input`
    width: 12rem;
    height: 1.5rem;
    margin: 1rem;
    font-size: 16px;
    padding: 0px 10px;
    text-align: center;
  `,
};
