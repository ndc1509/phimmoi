import React from "react";
import { authApi } from "@api/authApi";
import { useAppDispatch } from "@store/index";
import useWatchList from "./useWatchList";

const useReauthorize = () => {
    const dispatch = useAppDispatch();
    const handleReauthorize = React.useCallback(async () => {
        try {
            await dispatch(authApi.reauthorize());
        } catch (error) {
            console.log(error);
        }
    }, []);
    useWatchList();
    React.useEffect(() => {
        handleReauthorize();
    }, []);
};

export default useReauthorize;
