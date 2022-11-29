import { Logout } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
    Avatar,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
} from "@mui/material";
import React from "react";
import { authApi } from "@api/authApi";
import { useAppDispatch } from "@store/index";
import "./Account.css";
type AccountProps = {
    picture: string;
};

const Account = ({ picture }: AccountProps) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const dispatch = useAppDispatch();
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        dispatch(authApi.logout());
    };

    return (
        <div className="avatar">
            <IconButton onClick={handleClick}>
                <Avatar
                    className="avatar__icon"
                    src={picture}
                    variant="square"
                />
            </IconButton>
            <Menu
                className="avatar__menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={open}
                onClick={handleClose}
                onClose={handleClose}
            >
                <MenuItem>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon className="avatar__menu__item__icon" />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout className="avatar__menu__item__icon" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
};

export default React.memo(Account);
