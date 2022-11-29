import NotificationsIcon from "@mui/icons-material/Notifications";
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@store/index";
import { authSelector } from "@store/reducers/authSlice";
import Account from "./Account";
import "./Header.css";
import Navbar from "./Navbar";
import SearchBox from "./SearchBox";
const Header = () => {
    const authState = useAppSelector(authSelector);
    const [onTop, setOnTop] = React.useState<boolean>(true);
    const changeBackground = React.useCallback(() => {
        if (window.scrollY > 0) {
            setOnTop(false);
        } else {
            setOnTop(true);
        }
    }, []);

    React.useEffect(() => {
        changeBackground();
        window.addEventListener("scroll", changeBackground);
        return () => {
            window.removeEventListener("scroll", changeBackground);
        };
    }, [changeBackground]);

    return (
        <AppBar className={!onTop ? "main-header--active" : "main-header"}>
            <Toolbar>
                <a className="main-header__logo" href="/">
                    <img src="/logo31px.png" alt="logo31px" />
                </a>
                <Navbar />
                <div className="main-header__secondary-nav">
                    <div className="secondary-nav__item">
                        <SearchBox />
                    </div>

                    <div className="secondary-nav__item notification">
                        <IconButton>
                            <NotificationsIcon />
                        </IconButton>
                    </div>

                    <div className="secondary-nav__item ">
                        {authState.user ? (
                            <Account picture={authState.user.picture} />
                        ) : (
                            <Button className="secondary-nav__item__sign-in-btn">
                                <Link to="/login">Sign In</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
