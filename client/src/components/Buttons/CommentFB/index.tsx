//@ts-nocheck
import React from "react";
import ShareButton from "../ShareButton";

const CommentFB = () => {
  return (
    <>
      <ShareButton />
      <div
        style={{
          width: "100%",
          minHeight: "300px",
          marginTop: "32px",
          background: "white",
          borderRadius: "16px",
        }}
      >
        <div
          className="fb-comments"
          data-href={window.location.href.replace("localhost", "192.168.1.45")}
          data-width="100%"
          data-numposts="1"
        ></div>
      </div>
    </>
  );
};

export default CommentFB;
