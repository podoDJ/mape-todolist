import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { getUsers, updateUsers } from "../../api/users";
import { deleteLogins, getLogins } from "../../api/logins";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Header = () => {
  const navigate = useNavigate();

  const logOutFunc = async (event) => {
    event.preventDefault()
    await signOut(auth);
    sessionStorage.removeItem("token")
    window.location.reload()
  };

  return (
    <S.Header>
      <div>
        <S.MenuSpan onClick={() => navigate("/")}>로고(메인으로감)</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/boss")}>보스</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/quest")}>퀘스트</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/others")}>기타</S.MenuSpan>
      </div>
      <div>
        <S.MenuSpan onClick={(event) => logOutFunc(event)}>로그아웃</S.MenuSpan>
        <S.MenuSpan>프로필 위치</S.MenuSpan>
      </div>
    </S.Header>
  );
};

export default Header;

const S = {
  Header: styled.header`
    background-color: beige;
    border: 1px solid black;
    width: 100wh;
    height: 3rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  MenuSpan: styled.span`
    border: 1px solid black;
    padding: 0.8rem;
    cursor: pointer;
  `,
};
