import React from "react";
import { getWatchList } from "../api/myListApi";
import { useAppDispatch, useAppSelector } from "../store";
import { authSelector } from "../store/reducers/authSlice";

const useWatchList = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(authSelector);
  const getData = async () => {
    try {
      if (authState.isAuthenticated) await dispatch(getWatchList());
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getData();
  }, [authState.isAuthenticated]);
};

export default useWatchList;
