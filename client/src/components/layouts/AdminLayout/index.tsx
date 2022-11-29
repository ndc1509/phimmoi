import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import MovieCreationTwoToneIcon from "@mui/icons-material/MovieCreationTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@api/authApi";
import { useAppDispatch } from "@store/index";
type LayoutProps = {
    children: React.ReactNode;
};
const AdminLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" sx={{ zIndex: 1201 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Admin console
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: "12%",
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: "12%",
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        <ListItem key={"Movies"} disablePadding>
                            <ListItemButton
                                onClick={() => navigate("/admin/movies")}
                            >
                                <ListItemIcon>
                                    <MovieCreationTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Movies"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={"Genres"} disablePadding>
                            <ListItemButton
                                onClick={() => navigate("/admin/genres")}
                            >
                                <ListItemIcon>
                                    <CategoryTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Genres"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={"People"} disablePadding>
                            <ListItemButton
                                onClick={() => navigate("/admin/people")}
                            >
                                <ListItemIcon>
                                    <PeopleAltTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary={"People"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={"Users"} disablePadding>
                            <ListItemButton
                                onClick={() => navigate("/admin/users")}
                            >
                                <ListItemIcon>
                                    <AccountCircleTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Users"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem key={"Logout"} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    dispatch(authApi.logout());
                                    navigate("/");
                                }}
                            >
                                <ListItemIcon>
                                    <LogoutTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Logout"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {" "}
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default AdminLayout;
