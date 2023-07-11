import React, { useEffect, useState } from "react";

const Countdown = ({ dueDate }) => {
  // const gap = new Date(dueDate).getTime() - new Date().getTime();
  const countDownDate = new Date(dueDate).getTime();
  const timeGap = countDownDate - new Date().getTime();

  //참고사이트 : https://blog.greenroots.info/how-to-create-a-countdown-timer-using-react-hooks
  const [countDown, setCountDown] = useState(timeGap);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeGap <= 0) {
        setCountDown(0);
        return;
      } else {
        // console.log(new Date())
        // 여기 setCountDown(countDownDate - new Date().getTime()) 대신 setCountDown(timeGap)하면 이상하게 렌더링이 안되더라.
        setCountDown(countDownDate - new Date().getTime());
      }
    }, 1000);
    //얘가 젤 중요함!! 탈출조건이 있어야 timer의 영향을 안 받는 페이지에서 데이터 누수가 발생하지 않는다!!!
    return () => clearInterval(interval);
  }, [countDownDate]);

  const day = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown / (1000 * 60 * 60 * 24)) % 24);
  const minutes = Math.floor((countDown / (1000 * 60)) % 60);
  const seconds = Math.floor((countDown / 1000) % 60);

  let content = "";
  switch (true) {
    case timeGap <= 0:
      content = "시간이 초과되었습니다.";
      return content;

    case minutes <= 5:
      content = `D-Day: ${minutes}분 ${seconds}초`;
      return content;

    case hours <= 1:
      content = `D-Day: ${minutes}분 ${seconds}초`;
      return content;

    case day <= 1:
      content = `D-Day: ${hours}시간 ${minutes}분`;
      return content;

    case day > 2:
      content = `D-Day: ${day}일 ${hours}시간`;
      return content;
  }

  return (
    <p>{content}</p>
    // <p>{(timeGap <= 0)? "시간이 초과되었습니다." : `D-Day: ${day}일 ${hours}시간 ${minutes}분 ${seconds}초`}</p>
  );
  // <p>{day}일{hours}시간{minutes}분{seconds}초</p>
};
export default Countdown;
