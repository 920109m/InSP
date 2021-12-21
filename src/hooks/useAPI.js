import axios from "axios";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../common/recoilState";
import { useAuth } from "./useAuth";

export const useAPI = () => {
  const [{ user, authLoading }] = useAuth();
  const setLoading = useSetRecoilState(loadingState);

  const callAPI = ({ headers = {}, loading = false, ...options }) => {
    if (loading) setLoading(true);
    return axios({
      headers: {
        Authorization: `Bearer ${user && user.accessToken}`,
        ...headers,
      },
      ...options,
    })
      .then(res => res.data)
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        if (loading) setLoading(false);
      });
  };
  return callAPI;
};
