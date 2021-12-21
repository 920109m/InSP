import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Styles = styled.div`
  width: 1fr;
  background: ${({ footerBg }) => (footerBg ? footerBg : "#f5f5f5")};
  padding: ${({ hasBottomBar }) => (hasBottomBar ? "40px 20px 108px 20px" : "20px 40px 40px 40px")};
  font-size: 14px;
  line-height: 20px;
  color: #7c7c7c;

  a {
    /* text-decoration: ; */
    color: #a5a5a5;
  }
`;

const Footer = ({ hasBottomBar, ...props }) => (
  <Styles hasBottomBar={hasBottomBar} {...props}>
    <p>
      트웬티는 솔루션 제공 업체로써, 통신판매의 주체가 아닙니다. 상품 정보 고시와 상품 전달, 거래에
      대한 의무 및 책임은 판매자에게 있습니다.
    </p>
    <br />
    <a href="http://pf.kakao.com/_xexjgJT/chat" style={{ marginRight: "12px" }}>
      카톡 문의/사용신고
    </a>
    <a href="https://www.twenty.style/">트웬티 홈페이지</a>
  </Styles>
);

export default Footer;
