import React from "react";
import classes from "./Snake.module.css";

function Snake({ path }) {
  return path.map((sec, index) => {
    const pos = {
      left: `${sec[0]}%`,
      top: `${sec[1]}%`,
    };
    return <div className={classes.snake} key={index} style={pos}></div>;
  });
}

export default Snake;
