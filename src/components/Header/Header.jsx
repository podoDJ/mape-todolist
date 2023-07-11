import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { getUsers, updateUsers } from "../../api/users";

const Header = () => {
  const navigate = useNavigate();

  // const queryClient = useMutation(updateUsers, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("users");
  //     console.log("로그아웃 성공!!");
  //   },
  // });

  // const { isLoading, isError, data } = useQuery("users", getUsers);
  // if (isLoading) {
  //   return <h1>로딩중입니다. 잠시만 기다려주세요!!</h1>;
  // }
  // if (isError) {
  //   return <h1>로그인 오류가 발생했습니다!!</h1>;
  // }

  return (
    <S.Header>
      <div>
        <S.MenuSpan onClick={() => navigate("/")}>로고(메인으로감)</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/boss")}>보스</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/quest")}>퀘스트</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/others")}>기타</S.MenuSpan>
      </div>
      <div>
        <S.MenuSpan onClick={() => navigate("/signup")}>회원가입</S.MenuSpan>
        <S.MenuSpan>로그인</S.MenuSpan>
        <S.MenuSpan>로그아웃</S.MenuSpan>
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
