import React from "react";

const Player = ({title, link}) => {
  return (
    <iframe
      width="100%"
      className="aspect-video"
      origin="https://www.youtube.com"
      src={link}
      title={title}
      frameBorder=""
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default Player;
