import React from "react";
import { useHistory, useLocation } from "react-router";

import { Button, Typography } from "antd";
import Layout from "../components/style/Layout";

import { authState, useAuth } from "../hooks/useAuth";
import styled from "styled-components";
import ic_kakao_login from "../components/icon/ic_kakao_login.png";

export default function Login() {
  const history = useHistory();
  const location = useLocation();

  // 로그인 이후 페이지 세팅
  let { from } = location.state || { from: { pathname: "/" } };
  // 로그인 및 인증
  const [{ user, isPendingLogin }, { loginWithKakao, logout }] = useAuth();

  return (
    <>
      {/* 전체 레이아웃 */}
      {/* 헤더 바 */}
      <Layout Bar={<Typography>트웬티 클로즈드베타</Typography>}>
        <main>
          {/* 이미지 웨니 */}
          <img
            src="https://twenty-style.s3.ap-northeast-2.amazonaws.com/resources/twenty_hero_celebration.png"
            alt="트웬티"
            style={{ height: "auto", width: "280px", margin: "auto" }}
          />

          {/* 설명 */}
          <ScTypography>
            클로즈드베타 기간에는 승인 완료된 분만
            <br />
            트웬티 서비스를 이용할 수 있어요.
          </ScTypography>

          <ScButtonBox>
            {/* 버튼 (카카오) */}
            <ScButton
              onClick={() => {
                loginWithKakao().then(() => {
                  history.replace(from);
                });
              }}
              loading={isPendingLogin}
              kakao="true"
            >
              <img
                src={ic_kakao_login}
                style={{ width: "24px", height: "24px", marginRight: "20px" }}
              />
              카카오 계정으로 로그인
            </ScButton>

            {/* 버튼 ( 문의) */}
            <ScButton href={"https://pf.kakao.com/_xexjgJT/chat"} target={"_blank"}>
              이용 관련 문의
            </ScButton>
          </ScButtonBox>
        </main>
      </Layout>
    </>
  );
}

const ScTypography = styled(Typography.Text)`
  text-align: center;
  margin: 8px 0px 24px 0px;
  font-size: 16px;
`;

const ScButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
`;
const ScButton = styled(Button)`
  display: flex;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  font-size: 16px;
  border-radius: 4px;
  text-decoration: none;
  ${({ theme, kakao }) => (kakao ? theme.colorSet.kakao : theme.colorSet.third)};
  :hover,
  :active,
  :focus {
    ${({ theme, kakao }) => (kakao ? theme.colorSet.kakao : theme.colorSet.third)};
  }
`;
