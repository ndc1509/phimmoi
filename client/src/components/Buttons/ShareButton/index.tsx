//@ts-nocheck
import React from "react";

const ShareButton = () => {
  React.useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <div
      className="fb-like"
      data-href={window.location.href.replace("localhost", "192.168.1.45")}
      data-width=""
      data-layout="button"
      data-action="like"
      data-size="large"
      data-share="true"
    ></div>
  );
};

export default ShareButton;
