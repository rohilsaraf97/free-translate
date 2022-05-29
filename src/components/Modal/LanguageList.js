import React from "react";
import LanguageListItem from "./LanguageListItem";

const LanguagesList = (props) => {
  return (
    <div className="options-container">
      <ul>
        {props.languageList.map((language, _index) => {
          return (
            <LanguageListItem
              onClick={props.onClick}
              chosenLanguage={props.chosenLanguage}
              language={language}
              key={_index}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default LanguagesList;
