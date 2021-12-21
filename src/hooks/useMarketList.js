import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingState, marketListState } from "../common/recoilState";
import { useAPI } from "./useAPI";
import { useAuth } from "./useAuth";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
export const useMarketListInit = () => {
  const callAPI = useAPI();

  const { isLoading, error, data, isFetching } = useQuery("marketAll", () =>
    callAPI({ method: "get", url: `${process.env.REACT_APP_BASEURL}/market/all`, loading: true })
  );
  if (error) return "An error has occurred: " + error.message;

  return [data, { isLoading }];
};

export const useMarketList = () => {
  const callAPI = useAPI();
  const history = useHistory();

  const moveToMakeMaket = docId => {
    return history.push(`/makeMarket/${docId}`);
  };

  const marketInsert = async () => {
    await callAPI({ method: "post", url: `${process.env.REACT_APP_BASEURL}/market/insert` }).then(
      marketDocId => {
        return moveToMakeMaket(marketDocId);
      }
    );
  };
  return [{ moveToMakeMaket, marketInsert }];
};
