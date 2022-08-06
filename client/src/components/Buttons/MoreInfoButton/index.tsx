import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Button } from "@mui/material";
import React from "react";
import "./MoreInfoButton.css";
const MoreInfoButton = ({ movie }) => {
  return (
    <Button
      className="moreinfo-btn"
      size="large"
      href={`/details/${movie._id}`}
    >
      <InfoOutlinedIcon />
      More Info
    </Button>
  );
};

export default React.memo(MoreInfoButton);
