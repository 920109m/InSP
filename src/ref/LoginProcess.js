// import React, { useEffect } from "react";
// import { useHistory, useLocation } from "react-router-dom";
// import axios from "axios";

// //function
// import { useRequest } from "../hooks/useRequest";
// import { useAuth } from "../hooks/useAuth";
// //style
// import styled from "styled-components";
// import { Spin } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";

// export function LoginProcess() {
//     const history = useHistory();
//     const location = useLocation();
//     const [{ loginWithKakao }] = useAuth();

//     useEffect(() => {
//         loginWithKakao();
//     }, []);

//     return (
//         <>
//             <ScLoginProcessContainer>
//                 <Spin
//                     style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         width: "100%",
//                         height: "100px",
//                     }}
//                     size="large"
//                     indicator={<LoadingOutlined spin style={{ color: "#fff" }} />}
//                 />
//                 <ScLoginProcessLegalMention>
//                     트웬티는 솔루션 제공 업체로써,
//                     <br />
//                     통신판매의 주체가 아닙니다.
//                     <br />
//                     <br />
//                     상품 정보 고시와 상품 전달, 거래에 대한
//                     <br />
//                     의무 및 책임은 각 마켓 판매자에게 있습니다.
//                 </ScLoginProcessLegalMention>
//             </ScLoginProcessContainer>
//         </>
//     );
// }

// const ScLoginProcessContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: 100vh;
//     background-color: rgba(0, 0, 0, 0.5);
// `;

// const ScLoginProcessLegalMention = styled.div`
//     width: 100%;
//     color: #fff;
//     text-align: center;
// `;
