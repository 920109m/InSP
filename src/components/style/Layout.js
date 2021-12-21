import React from "react";
import PropTypes from "prop-types";

import Footer from "../Footer";

import styled from "styled-components";
import { theme } from "../../common/theme";

const Styles = styled.div`
  position: ${({ position }) => (position ? position : "relative")};
  background: ${({ bg }) => (bg ? bg : theme.color.white)};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : "100vh")};

  /* temp setting */
  max-width: 414px;
  margin: auto;
  background-color: ${theme.color.white};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.12);

  header {
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    width: 1fr;
    height: 60px;
    border-bottom: 1px solid ${theme.color.background};
    align-items: center;
    padding: 0px 20px;
    background: ${theme.color.white};
    z-index: 99;
    p {
      flex: 1;
      font-size: 16px;
    }

    button:last-child {
      /*
        nav 아이콘버튼 내부 padding 없앰
      */
      margin-right: -12px;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
    padding: ${({ minPadding }) => minPadding && "0px 20px"};
  }
`;

const Layout = ({
  Bar,
  footerBg,
  hasBottomBar,
  children,
  hasFooter,
  header,
  main,
  footer,
  ...props
}) => (
  <Styles {...props}>
    <header {...header}>{Bar}</header>
    {hasFooter ? (
      <>
        <main {...main}>{children}</main>
        <Footer hasBottomBar={hasBottomBar} {...footer} />
      </>
    ) : (
      <main {...main}>{children}</main>
    )}
  </Styles>
);

export default Layout;

Layout.defaultProps = {
  hasBottomBar: true,
  hasFooter: false,
};

Layout.propTypes = {
  hasBottomBar: PropTypes.bool,
  hasFooter: PropTypes.bool,
};
