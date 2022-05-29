import React from "react";

const LanguageListItem = (props) => {
  return (
    <div className="list-item" onClick={props.onClick}>
      <div className="icon">
        {props.chosenLanguage === props.language && "✔"}
      </div>
      <li
        style={{
          color: props.chosenLanguage === props.language ? "#8ab4f8" : null,
        }}
      >
        {props.language}
      </li>
    </div>
  );
};

export default LanguageListItem;
