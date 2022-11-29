import React from "react";
import { myListApi } from "@api/myListApi";
import { useAppDispatch, useAppSelector } from "@store/index";
import { authSelector } from "@store/reducers/authSlice";

const useWatchList = () => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector(authSelector);
    React.useEffect(() => {
        (async () => {
            try {
                if (authState.isAuthenticated)
                    await dispatch(myListApi.getWatchList());
            } catch (error) {
                console.log(error);
            }
        })();
    }, [authState.isAuthenticated]);
};

export default useWatchList;
