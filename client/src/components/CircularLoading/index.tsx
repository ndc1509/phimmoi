import { Box, CircularProgress } from "@mui/material";
import React from "react";

const CircularLoading = () => {
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#141414",
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default CircularLoading;
