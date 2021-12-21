// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useHistory, useLocation } from "react-router-dom";
// import { setLoginData, setDefaultData, setCurrentIdToken } from "../../reducers/V2Login";
// import { getLoginData, getKakaoToken } from "../common/api";
// import axios from "axios";

// const FIREBASE_IDTOKEN = "firebaseToken";
// const RETURN_ORDER_FAILED = "RETURN_PATH_AFTER_LOGOUT_FROM_ORDER_FAILED";
// const ORDERPAGE_SELECTED = "ORDERPAGE_SELECTED_OPTION";
// const REDIRECT = "redirect_uri";
// const LOGIN_ERROR = "로그인 후 이용하실 수 있어요. 로그인 페이지로 이동합니다.";

// //rn에서는 window.location으로 사용해야 인식함

// export default function useLogin() {
//   const history = useHistory();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { isUserData, userData } = useSelector(state => state.V2Login);

//   const {
//     firebase: { auth },
//   } = window;

//   const orderFailed = sessionStorage.getItem(RETURN_ORDER_FAILED);
//   const isOrderPageSelected = sessionStorage.getItem(ORDERPAGE_SELECTED);
//   const searchParams = new URLSearchParams(location.search);

//   // const getLoginData = async idToken => {
//   //   const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/user/me`, {
//   //     headers: {
//   //       authorization: `Bearer ${idToken}`,
//   //     },
//   //   });

//   //   const { seller, user, cards, main, mainMethod } = data;

//   //   return {
//   //     sellerData: seller,
//   //     userData: user,
//   //     cardData: cards,
//   //     main,
//   //     mainMethod,
//   //   };
//   // };

//   const dispatcher = {
//     handleLogin: () => {
//       if (searchParams.has(REDIRECT)) {
//         sessionStorage.setItem("url", searchParams.get(REDIRECT));
//       } else if (orderFailed) {
//         sessionStorage.setItem("url", orderFailed);
//         sessionStorage.removeItem(RETURN_ORDER_FAILED);
//       } else if (isOrderPageSelected) {
//         sessionStorage.setItem("url", location.pathname);
//       } else {
//         sessionStorage.setItem("url", "/marketList");
//       }

//       location.replace(
//         `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECTURL}/auth_kakao/`
//       );
//     },
//     handleLogout: async () => {
//       const iframe = document.createElement("iframe");
//       iframe.style.cssText = "position:absolute; left: -10000px";
//       iframe.src = "https://developers.kakao.com/logout";
//       document.body.appendChild(iframe);
//       await firebase.auth().signOut();
//       sessionStorage.removeItem(FIREBASE_IDTOKEN);
//       dispatch(setDefaultData());
//       history.push(`/buyerlogin?redirect_uri=${location.pathname}`);
//     },
//     checkUserLogin: () => {
//       auth().onAuthStateChanged(async user => {
//         if (user) {
//           const idToken = await user.getIdToken();
//           // dispatch(setLoginData(await getLoginData(idToken)));
//           dispatch(setCurrentIdToken(idToken));
//         } else {
//           const idToken =
//             sessionStorage.getItem(FIREBASE_IDTOKEN) ?? searchParams.get(FIREBASE_IDTOKEN);

//           if (idToken) {
//             sessionStorage.setItem(FIREBASE_IDTOKEN, idToken);
//             // dispatch(setLoginData(await getLoginData(idToken)));
//             dispatch(setCurrentIdToken(idToken));
//           } else {
//             if (window.ReactNativeWebView) {
//               sessionStorage.setItem("isNotLogin", true);
//               dispatch(setLoadingEnd(LOGIN_ERROR));
//               setTimeout(() => {
//                 window.ReactNativeWebView.postMessage(
//                   JSON.stringify({ status: "Login is required" })
//                 );
//               }, 2000);
//             } else {
//               sessionStorage.setItem("isNotLogin", true);
//               dispatch(setLoadingEnd(LOGIN_ERROR));
//               setTimeout(() => history.push(`/buyerlogin?redirect_uri=${location.pathname}`), 2000);
//             }
//           }
//         }
//       });
//     },
//     getCurrentIdToken: async () => {
//       if (sessionStorage.getItem("firebaseToken")) {
//         const idToken = sessionStorage.getItem("firebaseToken");
//         dispatch(setCurrentIdToken(idToken));
//       } else {
//         const idToken = await firebase.auth().currentUser.getIdToken(true);
//         dispatch(setCurrentIdToken(idToken));
//       }
//     },
//   };

//   return [dispatcher];
// }
