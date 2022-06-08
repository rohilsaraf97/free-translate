import React, { useState } from "react";
import LanguageList from "./LanguageList";
import SearchBar from "./SearchBar";

function Modal(props) {
  const [searchedLanguage, setSearchedLanguage] = useState("");
  const filteredLanguages = props.languages.filter((language) => {
    return language.toLowerCase().startsWith(searchedLanguage);
  });

  const handleClick = (e) => {
    props.onChoosingLanguage(e.target.textContent);
    props.setShowModal(null);
  };

  return (
    <div className="options-list">
      <SearchBar
        languages={props.languages}
        searchedLanguage={searchedLanguage}
        setShowModal={props.setShowModal}
        onChange={(e) => setSearchedLanguage(e.target.value)}
      />
      <LanguageList
        languageList={filteredLanguages}
        chosenLanguage={props.chosenLanguage}
        onClick={handleClick}
      />
    </div>
  );
}

export default Modal;
