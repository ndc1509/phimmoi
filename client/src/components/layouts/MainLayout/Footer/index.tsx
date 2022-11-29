import {
    Facebook,
    GitHub,
    Instagram,
    Twitter,
    YouTube,
} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const links = [
    "Audio and Subtitles",
    "Audio Description",
    "Help Center",
    "Gift Cards",
    "Media Center",
    "Investor Relations",
    "Jobs",
    "Terms of Use",
    "Privacy",
    "Legal Notices",
    "Cookie Preferences",
    "Corporate Information",
    "Contact Us",
];

const Footer = () => {
    return (
        <div className="main-footer">
            <div className="main-footer__content">
                <div className="main-footer__social-link">
                    <a href="https://www.facebook.com">
                        <Facebook />
                    </a>
                    <a href="https://www.instagram.com">
                        <Instagram />
                    </a>
                    <a href="https://twitter.com">
                        <Twitter />
                    </a>
                    <a href="https://www.youtube.com">
                        <YouTube />
                    </a>
                    <a href="https://github.com/ndc1509">
                        <GitHub />
                    </a>
                </div>
                <ul className="main-footer__links">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link to="/">{link}</Link>
                        </li>
                    ))}
                </ul>
                <div className="main-footer__signature">
                    &copy; 2022 ndc1509
                </div>
            </div>
        </div>
    );
};

export default React.memo(Footer);
