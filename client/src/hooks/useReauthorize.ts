import React from "react";
import { reauthorize } from "../api/authApi";
import { useAppDispatch } from "../store";
import useWatchList from "./useWatchList";

const useReauthorize = () => {

  const dispatch = useAppDispatch();
  const handleReauthorize = async () => {
    try {
      await dispatch(reauthorize());
    } catch (error) {
      console.log(error);
    }
  };
  useWatchList();
  React.useEffect(() => {
    handleReauthorize();
  }, []);
};

export default useReauthorize;
