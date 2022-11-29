import {
    Facebook,
    GitHub,
    Instagram,
    Twitter,
    YouTube,
} from "@mui/icons-material";
import React from "react";
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
        <div className="login-footer">
            <div className="login-footer__content">
                <div className="login-footer__social-link">
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
                <ul className="login-footer__links">
                    {links.map((link, index) => (
                        <li key={index}>
                            <a href="/">{link}</a>
                        </li>
                    ))}
                </ul>
                <div className="login-footer__signature">
                    &copy; 2022 ndc1509
                </div>
            </div>
        </div>
    );
};

export default React.memo(Footer);
