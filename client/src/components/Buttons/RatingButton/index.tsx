import { ratingApi } from "@api/ratingApi";
import useAppSnackBar from "@hooks/useAppSnackBar";
import { StarBorderOutlined } from "@mui/icons-material";
import { IconButton, Rating } from "@mui/material";
import { useAppSelector } from "@store/index";
import { authSelector } from "@store/reducers/authSlice";
import React from "react";
import "./RatingButton.css";
const RatingButton = ({ _id }: { _id?: string }) => {
    const showSnackbar = useAppSnackBar();
    const authState = useAppSelector(authSelector);
    const [value, setValue] = React.useState<number | null>(null);
    const [ratingOpened, setRatingOpened] = React.useState<boolean>(false);
    const initRate = React.useCallback(async () => {
        try {
            if (_id) {
                const data = await ratingApi.getUserRating(_id);
                if (data.rating) {
                    setValue(parseInt(data.rating));
                    setRatingOpened(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, [_id]);

    const handleRate = async (newValue: number | null) => {
        try {
            if (newValue && _id) {
                const data = await ratingApi.rateMovie({
                    _id,
                    score: newValue,
                });
                if (data.success) {
                    showSnackbar(`Your rating is ${newValue} stars`, "success");
                }
            }
            if (!newValue && _id) {
                const data = await ratingApi.rateMovie({ _id, score: -1 });
                if (data.success) {
                    showSnackbar(`${data.msg}`, "success");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        if (authState.isAuthenticated) initRate();
    }, [authState.isAuthenticated, initRate]);

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
                onMouseOver={handleShow}
            >
                <StarBorderOutlined />
            </IconButton>

            <Rating
                onMouseOver={handleShow}
                onMouseLeave={handleHide}
                className={
                    ratingOpened || value
                        ? "rating-bar"
                        : "rating-bar rating-bar--hidden"
                }
                name="simple-controlled"
                value={value}
                size="large"
                onChange={(event, newValue) => {
                    if (authState.isAuthenticated) {
                        handleRate(newValue);
                        setValue(newValue);
                    } else {
                        showSnackbar(
                            `Please login to rate this movie`,
                            "success"
                        );
                    }
                }}
            />
        </>
    );
};

export default React.memo(RatingButton);
