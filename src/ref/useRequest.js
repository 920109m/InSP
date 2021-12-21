import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "request":
      return {
        ...state,
        error: null,
        pending: true,
        fulfilled: false,
        rejected: false,
      };
    case "success":
      return {
        data: action.payload,
        error: null,
        pending: false,
        fulfilled: true,
        rejected: false,
      };
    case "failure":
      return {
        ...state,
        error: action.payload,
        pending: false,
        fulfilled: false,
        rejected: true,
      };
  }
}

export function useRequest(asyncTask) {
  // const {autoFirstRun = false, passArgs} = options || {};
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    pending: false,
    fulfilled: false,
    rejected: false,
  });
  const requestActions = {
    run: async (...args) => {
      dispatch({
        type: "request",
      });
      try {
        const data = await asyncTask(...args);
        dispatch({
          type: "success",
          payload: data,
        });
      } catch (e) {
        dispatch({
          type: "failure",
          payload: e,
        });
      }
    },
  };
  return [state, requestActions];
}
