import { StarBorderOutlined } from "@mui/icons-material";
import { IconButton, Rating } from "@mui/material";
import React from "react";
import { getUserRating, rateMovie } from "../../../api/ratingApi";
import useAppSnackBar from "../../../hooks/useAppSnackBar";
import { useAppSelector } from "../../../store";
import { authSelector } from "../../../store/reducers/authSlice";
import "./RatingButton.css";
const RatingButton = ({ _id }) => {
  const showSnackbar = useAppSnackBar();
  const authState = useAppSelector(authSelector);
  const [value, setValue] = React.useState<number | null>(null);
  const [ratingOpened, setRatingOpened] = React.useState<boolean>(false);

  const initRate = async () => {
    try {
      const data = await getUserRating(_id);
      if (data.rating) {
        setValue(parseInt(data.rating));
        setRatingOpened(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRate = async (newValue: number | null) => {
    try {
      if (newValue) {
        const data = await rateMovie({ _id, score: newValue });
        if (data.success) {
          showSnackbar(`Your rating is ${newValue} stars`, "success");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (authState.isAuthenticated) initRate();
  }, []);

  const handleShow = () => {
    console.log("show");
    setRatingOpened(true);
  };
  const handleHide = () => {
    console.log("hide");
    setRatingOpened(false);
  };
  return (
    <>
      <IconButton
        className="rating-star"
        size="small"
        onMouseEnter={handleShow}
        onMouseOver={handleShow} //kho hieu
      >
        <StarBorderOutlined />
      </IconButton>

      <Rating
        onMouseOver={handleShow}
        onMouseLeave={handleHide}
        className={
          ratingOpened || value ? "rating-bar" : "rating-bar rating-bar--hidden"
        }
        name="simple-controlled"
        value={value}
        size="large"
        onChange={(event, newValue) => {
          if (authState.isAuthenticated) {
            handleRate(newValue);
            setValue(newValue);
          } else {
            showSnackbar(`Please login to rate this movie`, "success");
          }
        }}
      />
    </>
  );
};

export default RatingButton;
