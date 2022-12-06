import React from "react";
import classes from "./Feed.module.css";

function Feed({ feed }) {
  const pos = {
    left: `${feed.position[0]}%`,
    top: `${feed.position[1]}%`,
  };

  let type;
  if(feed.feedType === 1) {
    type = classes.first
  } else if(feed.feedType === 2) {
    type = classes.second
  } else {
    type = classes.third
  }

  return <div className={`${classes.feed} ${type}`} style={pos}></div>;
}

export default Feed;
