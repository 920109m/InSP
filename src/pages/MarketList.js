import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useMarketList, useMarketListInit } from "../hooks/useMarketList";
import { pixelToRem, theme } from "../common/theme";

import { Button, Checkbox, Typography } from "antd";
import styled from "styled-components";
import { MenuOutlined } from "@ant-design/icons";
import Layout from "../components/style/Layout";
import alertCircle from "../components/icon/alertcircle.png";
import icon_link from "../components/icon/icon_link.png";

import dayjs from "dayjs";

import { Menu, Dropdown } from "antd";

export default function MarketList() {
  const [list, { isLoading }] = useMarketListInit();
  const [{ moveToMakeMaket, marketInsert }] = useMarketList();
  const [, { logout }] = useAuth();

  return (
    <>
      <Layout Bar={Bar({ logout, marketInsert })} bg="bg">
        {!isLoading && <MarketCard list={list} />}
      </Layout>
    </>
  );
}

const Bar = ({ logout, marketInsert }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="/profile">판매 작가 프로필</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a href="/festival">행사 운영</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={logout}>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <ScBarContainer>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button className="bar-btn left" icon={<MenuOutlined />} />
        </Dropdown>

        <Typography className="bar-title center">트웬티 마켓</Typography>
        <Button className="bar-btn right" onClick={marketInsert}>
          + 새 마켓
        </Button>
      </ScBarContainer>
    </>
  );
};

const MarketCard = ({ list }) => {
  const [{ moveToMakeMaket }] = useMarketList();

  const calcMarketDate = time => {
    return dayjs(time).format("YY-MM-DD A hh:mm");
  };
  return (
    <>
      <ScMarketCardContainer>
        <div> 임시 공지</div>
        <div> 임시 탭</div>
        {list.map(data => {
          return (
            <div className="card">
              <div className="img-container">
                <img src={`${process.env.REACT_APP_BASEURL_CDN}/${data.cover[0]}`} />
              </div>

              <div className="info-container">
                <div className="market-info">
                  <Typography className="title">
                    {data.status == 3 ? "(주문 종료)" : ""}{" "}
                    {data.title ? data.title : "마켓 이름 짓기"}
                  </Typography>
                  <Typography className="date">
                    {calcMarketDate(data.marketST)} ~ {calcMarketDate(data.marketED)}
                  </Typography>
                </div>

                <div className="status-info">
                  {data.status === 0 ? (
                    <div className="before-opening">
                      <img src={alertCircle} />
                      판매 주소 확인 : 마켓 수정 {">"} 최종 확인 {">"} 마켓 오픈 가능
                    </div>
                  ) : (
                    <span className="opened">
                      <Link to={`/v1/sellerData.publicId/${data.publicId}`} target="_blank">
                        {process.env.REACT_APP_REDIRECTURL}/v1/ sellerData.publicId/{data.publicId}
                      </Link>
                      <div className="section">
                        {/* <ScCheckBoxTextWrapper onClick={setMarketCard.openDialog} > */}
                        <div
                        // onClick={() =>
                        //   setMarketCard.changeMarketPublic(!market.public, market._id)
                        // }
                        >
                          <Checkbox checked={data.public} style={{ marginRight: "5px" }} />
                          <span>판매 가능 물품 확인 완료</span>
                        </div>
                        <Button
                          onClick={() =>
                            window.open(
                              "https://www.notion.so/twentyteam/48b0f1b839654c77a07226e87dc08aaa"
                            )
                          }
                        >
                          판매 규정
                          <img src={icon_link} />
                        </Button>
                      </div>
                    </span>
                  )}
                </div>
                <div className="btn-container">
                  <Button
                    onClick={() => {
                      moveToMakeMaket(data._id);
                    }}
                  >
                    마켓 수정
                  </Button>
                  {data.status !== 0 && <Button>주문 내역</Button>}
                </div>
              </div>
            </div>
          );
        })}
      </ScMarketCardContainer>
    </>
  );
};

const ScMarketCardContainer = styled.div`
  background-color: ${({ theme }) => theme.color.bg};
  width: 100%;

  /* temp setting */
  max-width: 414px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);

  .card {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 20px 20px 0px 20px;
    background-color: ${({ theme }) => theme.color.white};
    align-items: center;

    /*temp color border */
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 4%) 0px 8px 20px;
    border: 1px solid rgba(52, 52, 52, 0.12);

    .img-container {
      display: flex;
      width: 100%;
      height: 374px;
      justify-content: center;
      align-items: center;
      background-color: ${({ theme }) => theme.color.white};

      img {
        object-fit: contain;
        max-width: 100%;
        max-height: 100%;
      }
    }
    .info-container {
      margin: 12px 20px 0px;
      .market-info {
        margin-bottom: 8px;
        .title {
          ${({ theme }) => theme.font.h3}
        }
        .date {
          ${({ theme }) => theme.font.caption}
        }
      }
      .status-info {
        background-color: ${({ theme }) => theme.color.bg};
        padding: 8px 8px 0px;
        margin-bottom: ${pixelToRem(15)};
        .before-opening {
          ${({ theme }) => theme.font.caption}
          img {
            height: 16px;
            width: 16px;
            vertical-align: text-top;
            margin: 2.4px;
          }
        }
        .opened {
          display: grid;
          ${({ theme }) => theme.font.body2}
          a {
            /* color: #559aed; */
          }
          .section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              ${({ theme }) => theme.font.body2}
            }
            button {
              ${({ theme }) => theme.colorSet.option}
            }
          }
        }
      }
      .btn-container {
        display: flex;
        height: ${pixelToRem(48)};
        width: 100%;
        margin-bottom: 20px;
        button {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          ${({ theme }) => theme.colorSet.primary};
          :first-child {
            margin-right: 8px;
            ${({ theme }) => theme.colorSet.third};
          }
          :only-child {
            margin-right: 0px;
          }
        }
      }
    }
  }
`;

const ScBarContainer = styled.div`
  display: grid;

  grid-template-columns: 1fr 6fr 1fr;
  width: 100%;
  height: 100%;
  align-items: center;
  .bar-title {
    margin: auto;
  }
  .bar-btn {
    border: none;
    background-color: transparent;
  }
`;
