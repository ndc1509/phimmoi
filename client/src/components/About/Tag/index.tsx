import { Link } from "react-router-dom";
import { Genre, Person } from "@types";
import "./Tag.css";

type TagProps = {
    data: Person | Genre;
    last?: boolean;
    type: "person" | "genre";
};

const Tag = ({ data, last, type }: TagProps) => {
    const link =
        type === "person" ? `/person/${data._id}` : `/genre/${data._id}`;
    return (
        <span className="tag">
            <Link to={link}>{data.name}</Link>
            {last ? "" : ", "}
        </span>
    );
};

export default Tag;
