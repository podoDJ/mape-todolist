import React, { useEffect, useState } from "react";
import { useAuth } from "../../api/AuthContex";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addLogins, getLogins } from "../../api/logins";
import { getUsers } from "../../api/users";
import { useNavigate } from "react-router-dom";

const LoginComp = () => {
  const navigate = useNavigate()
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

    // 1. 입력값을 state로 처리한다.
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPw, setLoginPw] = useState("");

  useEffect(() => {
    console.log("loginEmail=>", loginEmail);
    console.log("loginPw=>", loginPw);
    console.log(
      "find=>",
      data?.find((item) => item.email === loginEmail)
    );
    console.log("userName=>", authUser ? authUser : "정보 못받은듯");
  }, [loginEmail, loginPw, authUser]);

  const queryClient = useQueryClient();
  const mutation = useMutation(addLogins, {
    onSuccess: () => {
      queryClient.invalidateQueries("logins")
      console.log("로그인 데이터 전송 성공!!")
    },
    onError: () => alert("뮤테이션에서 오류가 발생했습니다.")
  })

  // 2. db.json에서 users정보를 가져온다.
  const { isLoading, isError, data } = useQuery("users", getUsers);
  if (isLoading) {
    return <h1>로그인 중입니다. 잠시만 기다려주세요!!!</h1>;
  }
  if (isError) {
    return <h1>로그인 오류가 발생했습니다!!</h1>;
  }

  const logIn = (userName) => {
    setIsLoggedIn(true);
    setAuthUser({
      name: userName,
    });
  };
  const logOut = () => {
    setIsLoggedIn(false);
    setAuthUser(null);
  };

  // 1. 이메일과 비밀번호를 받는 useState가 필요하다.
  // 2. db.json의 users로부터 정보를 가져와야 한다.
  // 3. validation을 해야 한다.
  // (3-1) users로부터 가져온 데이터에서 이메일이 있는지부터 find한다. 없으면 조진다.
  // (3-2) 이메일이 (아마도 한개밖에 없도록 해야겠지만) filter인지 find인지 돌린 녀석의 password를 대조한다.
  // 4. validation을 통과하면, isLoggedIn의 state를 true로 바꿔줘야 한다.
  // 5. db.json에서 isLoggedIn 컬렉션을 만들도록 add를 시켜준다.
  // (5-1) 일단 api를 추가해야 한다.
  // (5-2) 컬렉션의 필드로는 (1)users.id (2)users.email (3)users.pw(수정삭제 검증용??) (4)users.name

  const inputChangeHandler = (event, setState) => {
    setState(event.target.value);
  };

  // 3. validation을 해야 한다.
  const inputSubmitHandler = (event) => {
    event.preventDefault();
    const validEmailUser = data.find((item) => item.email === loginEmail);
    if (!validEmailUser) {
      alert("잘못된 이메일 또는 비밀번호입니다.");
      return;
    } else {
      if (!validEmailUser.pw === loginPw) {
        alert("잘못된 이메일 또는 비밀번호입니다.");
        return;
      } else {
        // 4. validation을 통과하면, isLoggedIn의 state를 true로 바꿔줘야 한다.
        logIn(validEmailUser.name);
        const newLogin = {
          id: validEmailUser.id,
          name: validEmailUser.name,
          pw: validEmailUser.pw,
        };
        mutation.mutate(newLogin);
        navigate("/")
      }
    }
  };

  return (
    <>
      <span>User is currently: {isLoggedIn ? "Logged-In" : "Logged Out"}.</span>
      <br />
      {isLoggedIn ? <span>User name: {authUser.Name}</span> : null}
      <br />
      {isLoggedIn ? <button onClick={(event) => logOut(event)}>Log Out</button> : <button onClick={(event) => logIn(event)}>Log In</button>}
      <br />
      <br />
      <br />
      <div>
        <form onSubmit={(event) => inputSubmitHandler(event)}>
          <label>이메일</label>
          <input value={loginEmail} onChange={(event) => inputChangeHandler(event, setLoginEmail)} />
          <label>패스워드</label>
          <input value={loginPw} onChange={(event) => inputChangeHandler(event, setLoginPw)} />
          <button>로그인</button>
        </form>
      </div>
    </>
  );
};

export default LoginComp;
