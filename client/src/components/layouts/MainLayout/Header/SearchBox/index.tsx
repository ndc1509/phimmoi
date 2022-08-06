import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./SearchBox.css";
const SearchBox = () => {
  const params = useParams()
  const path = useLocation().pathname;
  const [query, setQuery] = React.useState<string>("");
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };
  const handleReset = () => {
    setQuery("");
    navigate("/");
  };

  React.useEffect(() => {
    setQuery(params.query || "")
  }, [params.query]);
  return (
    <div className="search-box">
      <div>
        <SearchIcon />
      </div>
      <InputBase
        className="search-box__input"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        onKeyPress={(e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            if (query === "") navigate("/");
            else if (path !== "/search/:query") navigate(`/search/${query}`);
          }
        }}
      />
      <div className={query ? "" : "hidden"}>
        <CloseIcon onClick={handleReset} />
      </div>
    </div>
  );
};

export default React.memo(SearchBox);
