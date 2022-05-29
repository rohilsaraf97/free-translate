import React from "react";
import DropDownArrow from "../UI/DropDownArrow";

function SelectDropDown(props) {
  return (
    <div
      className="select-drop-down"
      onClick={() => props.setShowModal(props.style)}
    >
      <input value={props.selectedLanguage} />
      <div className="down-arrow">
        <DropDownArrow />
      </div>
    </div>
  );
}

export default SelectDropDown;
