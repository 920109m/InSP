import React, { useState } from "react";
import { Drawer } from "antd";

const ScDrawer = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default ScDrawer;
// import React, { useState, useEffect } from "react";
// import { Drawer, Button } from "antd";
// import styled from "styled-components";

// const ScDrawer = () => {
//   const [visible, setVisible] = useState(false);

//   return (
//     <>
//       <ScDrawerForm className="drawer-form">
//         <div className="drawer-mask">
//           <div className="drawer-container">
//             <div className="drawer-header"></div>
//             <div className="drawer-body"></div>
//             <button>취소</button>
//             <button>확인</button>
//           </div>
//         </div>
//       </ScDrawerForm>
//     </>
//   );
// };
// export default ScDrawer;

// const ScDrawerForm = styled.div`
//   position: absolute;
//   top: 0%;
//   left: 0%;
//   display: flex;
//   height: 100%;
//   width: 100%;
//   .drawer-mask {
//     height: 100%;
//     width: 100%;
//     background-color: rgba(0, 0, 0, 0.25);
//   }
//   .drawer-container {
//     position: absolute;
//     background-color: white;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 30%;
//     height: 50%;
//   }
// `;
