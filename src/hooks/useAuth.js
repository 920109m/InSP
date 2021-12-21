import { useState, createContext, useContext, useEffect } from 'react';
import { getFirebaseToken } from '../common/api';

import {
  getIdToken,
  getAuth,
  signInWithCustomToken,
  onAuthStateChanged,
  setPersistence,
  inMemoryPersistence,
  browserSessionPersistence,
  signOut,
} from 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { idTokenState } from '../common/recoilState';

// const authContext = createContext();
// export function useAuth() {
//   return useContext(authContext);
// }
// export function ProvideAuth({ children }) {
//   const authProvider = useAuthForProvider();
//   return <authContext.Provider value={authProvider}>{children}</authContext.Provider>;
// }
// const useAuthForProvider = () => {

export const useAuth = () => {
  const { Kakao } = window;

  // firebase 로그인 user 정보
  const [isPendingLogin, setIsPendingLogin] = useState(false);
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const setIdToken = useSetRecoilState(idTokenState);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setIdToken(user?.accessToken || '');
    });
  });

  const loginWithKakao = () => {
    setIsPendingLogin(true);
    return new Promise((resolve, reject) => {
      Kakao.Auth.login({
        success: kakao => {
          getFirebaseToken(kakao.access_token).then(fbData => {
            setPersistence(auth, browserSessionPersistence)
              .then(async () => {
                try {
                  // 커스텀 토큰을 firebase 에 보내주면 session 에 id토큰(사용자인증)을 사용할 수 있게 해준다.
                  await signInWithCustomToken(auth, fbData.data);
                  resolve();
                } catch (error) {
                  console.log('fbToken 저장 실패', error);
                  reject();
                }
              })
              .catch(error => {
                console.log('fbToken 인증 실패', error);
                reject();
              })
              .finally(() => {
                setIsPendingLogin(false);
              });
          });
        },
        fail: error => {
          console.log('kakao login Failed', error);
          reject();
          setIsPendingLogin(false);
        },
      });
    });
  };
  const logout = () => {
    return auth.signOut();
  };
  return [
    { user, authLoading: loading },
    { loginWithKakao, logout, isPendingLogin },
  ];
};
