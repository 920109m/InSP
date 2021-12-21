import React from "react";
import { useHistory } from "react-router";

import { useMakeMarketInit } from "../hooks/useMakeMarket";

import styled from "styled-components";
import { Button, Typography } from "antd";
import Layout from "../components/style/Layout";
import { CloseOutlined } from "@ant-design/icons";

export default function MakeMarket() {
  const [market, { isLoading }] = useMakeMarketInit();
  const history = useHistory();
  const moveToBack = () => {
    history.goBack();
  };

  return (
    <Layout Bar={bar(moveToBack)}>
      <div>마켓안내</div>
      <div>물품등록</div>
      <div>submit버튼</div>
    </Layout>
  );
}

const bar = moveToBack => {
  return (
    <>
      <ScBarContainer>
        <Button
          className="bar-btn left"
          onClick={moveToBack}
          icon={<CloseOutlined style={{ fontSize: "20px" }} />}
        />
        <Typography className="bar-title center">마켓수정</Typography>
        <div className="button-box right">
          <Button className="bar-btn">마켓 복사</Button>
          <Button className="bar-btn caution">마켓 삭제</Button>
        </div>
      </ScBarContainer>
    </>
  );
};

const ScBarContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 2fr;
  width: 100%;
  height: 100%;
  align-items: center;
  .bar-title {
    margin: auto;
    width: 3fr;
  }
  .bar-btn {
    border: none;
    background-color: transparent;
  }
  .caution {
    ${({ theme }) => theme.colorSet.caution}
  }
`;
