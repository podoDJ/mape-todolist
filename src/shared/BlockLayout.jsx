import React from "react";
import { styled } from "styled-components";
import BlockHeader from "../components/Header/BlockHeader";

const BlockLayout = ({ children }) => {
  return (
    <>
      <StBlockHeader>
        <BlockHeader/>
      </StBlockHeader>
      {/* //children부분 이해 못함. 아냐 솔직히 칠드런 개념부터 헷갈린다고 하자. 아니 부모가 자식한테 데이터주는건 아는데.. */}      
      <StBlockLayout>
        <div>{children}</div>
      </StBlockLayout>
    </>
  );
};

export default BlockLayout;
const StBlockHeader = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
`;

const StBlockLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 2px auto;
`;
