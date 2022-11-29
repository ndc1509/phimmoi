import NotificationsIcon from "@mui/icons-material/Notifications";
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "@store/index";
import { authSelector } from "@store/reducers/authSlice";
import Account from "../../MainLayout/Header/Account";
import Navbar from "../../MainLayout/Header/Navbar";
import SearchBox from "../../MainLayout/Header/SearchBox";
import "./Header.css";
const SecondaryHeader = () => {
    const authState = useAppSelector(authSelector);

    return (
        <AppBar className={"secondary-header"}>
            <Toolbar>
                <a className="secondary-header__logo" href="/">
                    <img src="/logo31px.png" alt="logo31px" />
                </a>
                <Navbar />
                <div className="secondary-header__secondary-nav">
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

export default SecondaryHeader;
