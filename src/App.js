import TextBox from "./components/Layout/TextBox";
import Arrows from "./components/UI/Arrows";
import Modal from "./components/Modal/Modal";
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Button from "./components/UI/Button";

const defaultLanguageState = {
  inputLanguage: "English",
  outputLanguage: "Hindi",
};

const languageReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      inputLanguage: action.value,
      outputLanguage: state.outputLanguage,
    };
  }
  if (action.type === "OUTPUT") {
    return {
      inputLanguage: state.inputLanguage,
      outputLanguage: action.value,
    };
  }
  if (action.type === "INVERT") {
    return {
      inputLanguage: state.outputLanguage,
      outputLanguage: state.inputLanguage,
    };
  }
  return defaultLanguageState;
};

function App() {
  const [dataObj, setDataObj] = useState({});
  const [languageState, dispatchLanguageReducer] = useReducer(
    languageReducer,
    defaultLanguageState
  );
  const [enteredText, setEnteredText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [languageList, setLanguageList] = useState([]);
  const [showModal, setShowModal] = useState(null);

  const translateText = async () => {
    let srcKey = dataObj.find(
      (record) => record.name === languageState.inputLanguage
    ).language;
    let targetKey = dataObj.find(
      (record) => record.name === languageState.outputLanguage
    ).language;

    const response = await axios("http://localhost:8000/translations", {
      params: { enteredText, srcKey, targetKey },
    });

    console.log(response);

    setTranslatedText(response.data.translations.translatedText);
  };

  const getLanguages = async () => {
    const response = await axios("http://localhost:8000/languages");
    console.log(response.data);
    setDataObj(response.data);
    const arrOfLanguages = response.data.map((language) => {
      return language.name;
    });
    setLanguageList(arrOfLanguages);
  };

  useEffect(() => {
    getLanguages();
  }, []);

  const handleClick = () => {
    dispatchLanguageReducer({ type: "INVERT" });
  };

  const clearHandler = () => {
    setEnteredText("");
    setTranslatedText("");
  };

  const setInputLanguage = (language) => {
    dispatchLanguageReducer({ type: "INPUT", value: language });
  };

  const setOutputLanguage = (language) => {
    dispatchLanguageReducer({ type: "OUTPUT", value: language });
  };
  return (
    <div className="app">
      {!showModal && (
        <>
          <TextBox
            selectedLanguage={languageState.inputLanguage}
            style="input"
            setShowModal={setShowModal}
            text={enteredText}
            onChange={(e) => setEnteredText(e.target.value)}
            onClear={clearHandler}
          />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows></Arrows>
          </div>

          <TextBox
            selectedLanguage={languageState.outputLanguage}
            style="output"
            setShowModal={setShowModal}
            text={translatedText}
          />
          <Button onClick={translateText} />
        </>
      )}

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          languages={languageList}
          onChoosingLanguage={
            showModal == "input" ? setInputLanguage : setOutputLanguage
          }
          chosenLanguage={
            showModal == "input"
              ? languageState.inputLanguage
              : languageState.outputLanguage
          }
        />
      )}
    </div>
  );
}

export default App;
