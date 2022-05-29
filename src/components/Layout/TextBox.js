import React from "react";
import SelectDropDown from "./SelectDropDown";
function TextBox(props) {
  return (
    <div className={props.style}>
      <SelectDropDown
        selectedLanguage={props.selectedLanguage}
        style={props.style}
        setShowModal={props.setShowModal}
      />
      <textarea
        placeholder={props.style === "input" ? "Enter Text" : "Translated Text"}
        value={props.text}
        onChange={props.onChange}
        disabled={props.style === "output"}
      />
      {props.style === "input" && (
        <div className="delete" onClick={props.onClear}>
          ⨯
        </div>
      )}
    </div>
  );
}

export default TextBox;
