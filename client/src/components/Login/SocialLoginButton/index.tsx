import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";
import React from "react";
import "./SocialLoginButton.css";

type SocialLoginButtonProps = {
    platform: SocialPlatform;
};

export enum SocialPlatform {
    Google = "google",
    Facebook = "facebook",
}

const SocialLoginButton = ({ platform }: SocialLoginButtonProps) => {
    const handleSocialLogin = () => {
        window.open(
            `${process.env.URL}api/v1/auth/${platform}`,
            "_self"
        );
    };
    return (
        <Button
            className={`social-btn ${platform}-btn`}
            onClick={handleSocialLogin}
        >
            <span>
                {platform === SocialPlatform.Facebook ? (
                    <FacebookIcon />
                ) : (
                    <GoogleIcon />
                )}
            </span>
            &nbsp; &nbsp; Sign In with{" "}
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </Button>
    );
};

export default React.memo(SocialLoginButton);
