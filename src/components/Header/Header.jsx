import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Header = () => {
  const navigate = useNavigate();

  const logOutFunc = async (event) => {
    event.preventDefault();
    await signOut(auth);
    sessionStorage.removeItem("token");
    window.location.reload();
  };

  const moveUrl = (goTo) => {
    switch (goTo) {
      case "maplestory":
      window.open("https://maplestory.nexon.com/home/main", "_blank")
      break;
      case "nexon":
      window.open("https://www.nexon.com/Home/Game", "_blank")
      break;
      case "developerGithub":
      window.open("https://github.com/podoDJ/maple-todolist.git", "_blank")
      break;
      case "spartaCodingClub":
      window.open("https://spartacodingclub.kr/", "_blank")
      break;
    }
  };

  return (
    <S.Header>
      <S.MenuCtn gap="0px">
        <S.MenuSpan onClick={() => navigate("/")}>로고(메인으로감)</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/boss")}>보스</S.MenuSpan>
        <S.MenuSpan onClick={() => navigate("/quest")}>퀘스트</S.MenuSpan>
        <S.MenuSpan borderRight="3px solid white" onClick={() => navigate("/others")}>
          기타
        </S.MenuSpan>
      </S.MenuCtn>
      <S.MenuCtn gap="50px">
        <S.ImgLogo name="maplestory" width={"50px"} height={"50px"} src="https://ifh.cc/g/msRQzv.png" 
        onClick={(event)=> moveUrl(event.target.name)} />
        <S.ImgLogo name="nexon" width={"100px"} height={"50px"} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Nexon_Logo.svg/799px-Nexon_Logo.svg.png?20210603141237"
        onClick={(event)=> moveUrl(event.target.name)} />
        <S.ImgLogo name="developerGithub" width={"50px"} height={"50px"} rotateZ="-480deg" src="https://cdn-icons-png.flaticon.com/512/5968/5968866.png"
        onClick={(event)=> moveUrl(event.target.name)} />
        <S.ImgLogo name="spartaCodingClub" width={"50px"} height={"50px"} rotateZ="+450deg"src="https://s3.ap-northeast-2.amazonaws.com/materials.spartacodingclub.kr/free/logo_teamsparta.png"
        onClick={(event)=> moveUrl(event.target.name)} />
      </S.MenuCtn>
      <S.MenuCtn gap="0px">
        <S.MenuSpan onClick={(event) => logOutFunc(event)}>로그아웃</S.MenuSpan>
        <S.MenuSpan borderRight="3px solid white" onClick={()=>alert("프로필도 아직 구현 못했어요!")}>프로필 위치</S.MenuSpan>
      </S.MenuCtn>
    </S.Header>
  );
};

export default Header;

const S = {
  Header: styled.header`
    background-color: #ffd87d;
    width: 100;
    height: 80px;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: repeat(1, 1fr);

  `,
  MenuCtn: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${(props) => props.gap};
    margin: 0px 30px;
  `,
  MenuSpan: styled.span`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0px 20px;
    border-left: 3px solid white;
    border-right: ${(props) => (props.borderRight ? props.borderRight : "none")};
    height: 100%;
  `,
  ImgLogo: styled.img`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    transition-duration: 250ms;
    cursor: pointer;
    &:hover {
      transform: scale(1.05) rotateZ(${(props) => props.rotateZ? props.rotateZ : "-10deg"});
      /* rotateZ(-10deg) */
      transition-duration: 250ms;
    }
  `,
};
