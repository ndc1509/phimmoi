import { Add as AddIcon, Check as CheckIcon } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { addToWatchList, removeFromWatchList } from "../../../api/myListApi";
import useAppSnackBar from "../../../hooks/useAppSnackBar";
import { useAppDispatch, useAppSelector } from "../../../store";
import { authSelector } from "../../../store/reducers/authSlice";
import { movieSelector } from "../../../store/reducers/movieSlice";
import "./AddButton.css";
const AddButton = ({ _id }) => {
  const showSnackbar = useAppSnackBar();
  const authState = useAppSelector(authSelector);
  const movieState = useAppSelector(movieSelector);
  const dispatch = useAppDispatch();
  const [inWatchList, setInWatchList] = React.useState<boolean>(false);

  React.useEffect(() => {
    setInWatchList(movieState.watchList.some((movieId) => movieId === _id));
  }, [movieState.watchList]);

  const handleClick = async () => {
    if (authState.isAuthenticated) {
      try {
        const data = await dispatch(
          inWatchList ? removeFromWatchList(_id) : addToWatchList(_id)
        );
        showSnackbar(data.payload.msg, "success");
      } catch (error) {
        console.log(error);
      }
    } else showSnackbar("Please login to add this movie to your list", "error");
  };

  return (
    <Tooltip
      title={inWatchList ? "Remove from My List" : "Add to My List"}
      placement="top"
    >
      <IconButton className="add-btn" size="small" onClick={handleClick}>
        {inWatchList ? <CheckIcon /> : <AddIcon />}
      </IconButton>
    </Tooltip>
  );
};
export default AddButton;
