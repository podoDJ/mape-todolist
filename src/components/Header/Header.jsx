import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { getUsers, updateUsers } from "../../api/users";
import { useAuth } from "../../api/AuthContex";
import { deleteLogins, getLogins } from "../../api/logins";

const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteLogins, {
    onSuccess: () => {
      queryClient.invalidateQueries("logins");
      console.log("로그인 데이터 삭제 완료.")
    },
    onerror: () => alert("로그인 데이터 삭제 에러")
  })
  
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth()

  const logOut = (event) => {
    event.preventDefault()
    setIsLoggedIn(false)
    setAuthUser(null)
  }

  const { isLoading, isError, data } = useQuery("logins", getLogins)
  if (isLoading) {
    return <h1>로그인 정보를 불러오는 중입니다.</h1>
  }
  if (isError) {
    return <h1>로그인 정보 Get 오류</h1>
  }
  
  const deleteLoginHandler = (event) => {
    mutation.mutate(authUser.id)
    logOut(event)
  }

  return (
    <S.Header>
      <div>
        <S.MenuSpan onClick={() => navigate("/")}>로고(메인으로감)</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/boss")}>보스</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/quest")}>퀘스트</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/quest")}>퀘스트</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/others")}>기타</S.MenuSpan>
      </div>
      <div>
        <S.MenuSpan onClick = {(event) => deleteLoginHandler(event)}>로그아웃</S.MenuSpan>
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
