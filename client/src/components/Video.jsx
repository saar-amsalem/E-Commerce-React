import React from "react";
import YouTube from "react-youtube";
import styled from "styled-components";

export default function YoutubeEmbed() {
  return (
    <YouTube
      style={{
        margin: "auto",
        padding: "10px",
        width: "700px",
      }}
      videoId="_OjPURZP-60"
    />
  );
}
