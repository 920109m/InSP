import axios from "axios";

export const getFirebaseToken = async token => {
  const firebaseToken = await axios.post(`${process.env.REACT_APP_BASEURL}/auth/kakao`, {
    accessToken: token,
  });
  return firebaseToken;
};
