import React from "react";
import { css, styled } from "styled-components";
styled;
const Buttons = () => {
  return <div>Buttons</div>;
};

export default Buttons;

export const ButtonCtn = ({ children, ...rest }) => {
  return(
    <>
    <S.Button { ...rest }>{children}</S.Button>
    </>
  )
}

const S = {
  Button: styled.button`
    border: none;
    cursor: pointer;
    border-radius: 5%;
    font-weight: 3;
    font-size: 15px;

    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${({ color }) => color};

    margin: 5px;
    ${({ size }) => {
       switch (size) {
        case "large":
          return css`
            width: 200px;
            height: 50px;
          `;
        case "medium":
          return css`
            width: 150px;
            height: 45px;
          `;
        case "small":
          return css`
            width: 100px;
            height: 40px;
          `;
        case "card-button":
        return css`
            width: 80px;
            height: 40px;
          `;
        case "write-button":
        return css`
            width: 100%;
            height: 40px;
          `;
        default:
          break;
       }
    }}
  `,
};
