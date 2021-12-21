import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from '@/App';

import 'antd/dist/antd.less';

import { RecoilRoot } from 'recoil';

import { initializeApp } from 'firebase/app';
import ThemeProvider from './ThemeProvider';

/**
 * 카카오 initialize
 */
const { Kakao } = window;
Kakao.init(`${process.env.REACT_APP_KAKAO_JSSDK_KEY}`);

/**
 * firebase initialize
 */
initializeApp({
  apiKey: `${process.env.REACT_APP_FB_APIKEY}`,
  projectId: `${process.env.REACT_APP_PROJECTID}`,
  authDomain: `${process.env.REACT_APP_FB_AUTHDOMAIN}`,
});

ReactDOM.render(
  // <React.StrictMode>
  <RecoilRoot>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  // </React.StrictMode>,
  document.getElementById('root')
);
