import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";
import { SocialPlatform } from "../../../interface/enum";
import "./SocialLoginButton.css";

type SocialLoginButtonProps = {
  platform: SocialPlatform;
};

const SocialLoginButton = ({ platform }: SocialLoginButtonProps) => {
  const handleSocialLogin = () => {
    window.open(`http://localhost:5000/api/v1/auth/${platform}`, "_self");
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

export default SocialLoginButton;
