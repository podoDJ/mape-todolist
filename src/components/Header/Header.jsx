import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Header = () => {
  const navigate = useNavigate()
  return (
    <S.Header>
      <div>
        <S.MenuSpan onClick={() => navigate("/")}>로고(메인으로감)</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/boss")}>보스</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/quest")}>퀘스트</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/others")}>기타</S.MenuSpan>
      </div>
      <div>
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
  `,
};
