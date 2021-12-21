import { createGlobalStyle } from "styled-components";
import { theme } from "../../common/theme";

const GlobalStyle = createGlobalStyle`

@font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 400;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf) format('opentype');}
@font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 700;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.otf) format('opentype');}
  
  html, body {
    width: 100%;
    height: 100%; 
    margin: 0;
    background: ${theme.color.bg};
    color: ${theme.color.font};

    font-size: 16px;
    line-height: 1.5;
    font-family: 'Noto Sans KR', 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

    /* These are technically the same, but use both */
    overflow-wrap: break-word;
    word-wrap: break-word;

     -ms-word-break: break-all;
    /* This is the dangerous one in WebKit, as it breaks things wherever */
    word-break: break-all;
    /* Instead use this non-standard one: */
    word-break: break-word;

    /* Adds a hyphen where the word breaks, if supported (No Blink) */
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
    #root {
      position: relative;
      width: 100%;
      min-height: 100%;
      background: white;
    }
    
    input[name="price"], input[name="stock"], input[name="weight"], input[name="limitAmount"], input[name="minPrice"], input[name="maxPrice"]{
      text-align: right;
    }
    p,span {
      font-size: 16px;
      color: ${theme.color.black};
      font-family: 'Noto Sans KR', 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      font-weight: 400;
    }
    
    textarea {
      border: 1px solid ${theme.color.black12};
      font-size: 16px;
      color: ${theme.color.black};
      padding: 8px;
      font-family: 'Noto Sans KR', 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      font-weight: 400;
    }

    /*temp custom global class*/
    .left {
    display: flex;
    justify-content: start;
    }
    .center {
    display: flex;
    justify-content: center;
    }
    .right {
    display: flex;
    justify-content: right;
    }
    .ant-btn-icon-only {
      display: flex;
      justify-content: center;
      align-items: center;
    }

  }
`;

export default GlobalStyle;
