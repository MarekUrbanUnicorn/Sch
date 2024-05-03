// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import lsi from "./lsi.js"

const LangContext = createContext();


export const LangProvider = ({ children }) => {

  const [lang, setLang] = useState("cz");
  function setAndValidateLang(newLang) {
    switch (newLang) {
      case "cz":
      case "en":
        setLang(newLang)
        break;

      default:
        console.error(`unknown lang  ${newLang}. lang not changed`)
        break;
    }
  }

  function getLangSelector(className) {
    return <select className={className} value={lang} onChange={(e) => { setAndValidateLang(e.target.value) }}>
      <option value="cz">Czech</option>
      <option value="en">English</option>
    </select>
  }
  function getLsi(lsiName) {
    if (lsi) {
      if (lsi[lsiName] !== undefined) {
        if (lsi[lsiName][lang] !== undefined) {
          return lsi[lsiName][lang];
        }
        else {
          console.error(`unknown lang mutation with key ${lang} on lsiItem ${lsiName}`)
        }
      }
      else {
        console.error(`unknown lsiItem ${lsiName}`)
      }
    }
    else {
      console.error(`failed to load LSI file`)
    }
  }

  return (
    <>
      <LangContext.Provider value={{ setLang: setAndValidateLang, lang, getLangSelector, getLsi }}>
        {children}
      </LangContext.Provider>
    </>
  );
};

export const useLang = () => useContext(LangContext);