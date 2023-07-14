import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useMutation, useQueryClient } from "react-query";
import { addUsers } from "../../api/users";
import { ButtonCtn } from "../common/Buttons";
import { styled } from "styled-components";

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
          mutation.mutate(newUser);
          alert("회원가입을 완료했습니다!");
          navigate("/")
          window.location.reload();
      } catch (err) {
        console.log("파이어베이스 에러");
      }
    }
  };
  return (

      <S.LoginCtn
        onSubmit={registerFunc}>
        <S.Section>
          <S.Label>이름</S.Label>
          <S.Input name="name" placeholder="실명이 아니어도 괜찮아요!"  onChange={(event) => inputChangeHandler(event)} />
        </S.Section>
        <S.Section>
          <S.Label>이메일</S.Label>
          <S.Input name="email" placeholder="중복이메일 검사는 시간부족으로 못했어요!!"  onChange={(event) => inputChangeHandler(event)} />
        </S.Section>
        <S.Section>
          <S.Label>패스워드</S.Label>
          <S.Input type="password" placeholder="비밀번호는 6자리 이상으로 정해주세요!" name="pw" onChange={(event) => inputChangeHandler(event)} />
        </S.Section>
        <S.Section>
          <S.Label>핸드폰 번호</S.Label>
          <S.Input name="phone" placeholder="대쉬(-)없이 번호만 적어주세요!" onChange={(event) => inputChangeHandler(event)} />
        </S.Section>
        <S.Section>
          <S.Label>캐릭터 닉네임</S.Label>
          <S.Input name="charName" placeholder="메이플 닉네임은 최대 6자에요!!" maxLength={6} onChange={(event) => inputChangeHandler(event)} />
        </S.Section>
        <S.Section>
          <S.Label>캐릭터 직업</S.Label>
          <S.Input name="charClass" placeholder="현생 직업 적지 말아주세요!!" onChange={(event) => inputChangeHandler(event)} />
        </S.Section>
        <S.Section>
          <S.Label>캐릭터 레벨</S.Label>
          <S.Input type="number" placeholder="본케 레벨로 적어주세요!!" name="charLevel" onChange={(event) => inputChangeHandler(event)} />
        </S.Section>
        <S.Section>
          <S.Label>유니온 레벨</S.Label>
          <S.Input type="number" placeholder="모든 캐릭터들의 레벨 합이에요!!" name="unionLevel" onChange={(event) => inputChangeHandler(event)} />
        </S.Section>
        <ButtonCtn backgroundColor="var(--color-box1)" color="white" size="large">등록하기</ButtonCtn>
      </S.LoginCtn>

  );
};
export default RegisterComp;

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
    Section: styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `,
  Label: styled.label`
    padding: 10px;
    border-radius: 10px;
    background-color: var(--color-box1);
    width: 102px;
    height: 20px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Input: styled.input`
    width: 20rem;
    height: 1.5rem;
    margin: 1rem;
    font-size: 16px;
    padding: 0px 10px;
    text-align: center;
    align-items: center;
  `,
}