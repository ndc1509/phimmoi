import React from "react";
import "./Background.css";
const Background = () => {
    return (
        <div className="login-background">
            <img
                src="https://assets.nflxext.com/ffe/siteui/vlv3/1ef84595-1fdb-4404-adac-15215ceeb3ae/38067f6b-ec2e-43a3-816d-44bf2aeddd21/VN-en-20220711-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                srcSet="
                    https://assets.nflxext.com/ffe/siteui/vlv3/1ef84595-1fdb-4404-adac-15215ceeb3ae/38067f6b-ec2e-43a3-816d-44bf2aeddd21/VN-en-20220711-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w, 
                    https://assets.nflxext.com/ffe/siteui/vlv3/1ef84595-1fdb-4404-adac-15215ceeb3ae/38067f6b-ec2e-43a3-816d-44bf2aeddd21/VN-en-20220711-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, 
                    https://assets.nflxext.com/ffe/siteui/vlv3/1ef84595-1fdb-4404-adac-15215ceeb3ae/38067f6b-ec2e-43a3-816d-44bf2aeddd21/VN-en-20220711-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w"
                alt="background"
            />
        </div>
    );
};

export default React.memo(Background);
