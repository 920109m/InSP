import { useEffect } from "react";
import { useLocation } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingState, marketState } from "../common/recoilState";
import { useAPI } from "./useAPI";
import { useAuth } from "./useAuth";
import { useQuery } from "react-query";

export const useMakeMarketInit = () => {
  const callAPI = useAPI();

  const location = useLocation();
  const docId = location.pathname.split("/")[2];

  const { isLoading, error, data, isFetching } = useQuery("marketGet", () =>
    callAPI({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/market/get/${docId}`,
      loading: true,
    })
  );
  if (error) return "An error has occurred: " + error.message;
  return [data, { isLoading }];
};
