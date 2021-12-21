import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";

import { Modal, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { theme } from "../common/theme";
import { useRecoilState, useRecoilValue } from "recoil";
import { loadingState } from "../common/recoilState";

export const LoadingAuth = () => {
  const [, { isPendingLogin }] = useAuth();

  const modalContenet = () => {
    return (
      <ScModalContent>
        <LoadingOutlined style={{ fontSize: 24, color: `${theme.color.white}` }} spin />
        <div className="text-contents">
          트웬티는 솔루션 제공 업체로써,
          <br />
          통신판매의 주체가 아닙니다.
          <br />
          <br />
          상품 정보 고시와 상품 전달, 거래에 대한
          <br />
          의무 및 책임은 각 마켓 판매자에게 있습니다.
        </div>
      </ScModalContent>
    );
  };
  return (
    <>
      <Modal
        visible={isPendingLogin}
        centered
        closable={false}
        title={null}
        footer={null}
        modalRender={modalContenet}
      />
    </>
  );
};

const ScModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  .text-contents {
    color: ${({ theme }) => theme.color.white};
    text-align: center;
    margin-top: 24px;
  }
`;

export const LoadingProcess = () => {
  const isLoading = useRecoilValue(loadingState);
  const bodyStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  };
  return (
    <div>
      <>
        <Modal
          visible={isLoading}
          centered
          closable={false}
          title={null}
          footer={null}
          width={200}
          bodyStyle={bodyStyle}
        >
          <ScContent>
            <LoadingOutlined style={{ fontSize: 32, color: `${theme.color.black}` }} spin />
            <Typography>로딩 중</Typography>
          </ScContent>
        </Modal>
      </>
    </div>
  );
};

const ScContent = styled.div`
  span {
    margin: 20px 0px;
  }
  article {
    ${({ theme }) => theme.font.body1}
  }
`;
