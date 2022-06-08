import React from "react";

function Button(props) {
  return (
    <div className="button-container" onClick={props.onClick}>
      ➔
    </div>
  );
}

export default Button;
