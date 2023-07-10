import React, { useEffect, useState } from "react";

const Countdown = ({ dueDate }) => {
  // const gap = new Date(dueDate).getTime() - new Date().getTime();
  const countDownDate = new Date(dueDate).getTime();
  const timeGap = countDownDate - new Date().getTime();
  // console.log(countDownDate)
  // console.log(countDownDate - new Date().getTime())

  //참고사이트 : https://blog.greenroots.info/how-to-create-a-countdown-timer-using-react-hooks
  const [countDown, setCountDown] = useState(timeGap);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeGap <= 0) {
        setCountDown(0);
        return;
      } else {
        setCountDown(countDownDate - new Date().getTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  const day = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown / (1000 * 60 * 60 * 24)) % 24);
  const minutes = Math.floor((countDown / (1000 * 60)) % 60);
  const seconds = Math.floor((countDown / 1000) % 60);
  
  return (
    <p>{(timeGap <= 0)? "시간이 초과되었습니다." : `D-Day: ${day}일 ${hours}시간 ${minutes}분 ${seconds}초`}</p>
  );
  // <p>{day}일{hours}시간{minutes}분{seconds}초</p>
};
export default Countdown;
