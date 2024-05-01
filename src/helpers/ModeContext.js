// AuthContext.js
import React, { createContext, useContext, useState } from 'react';


const msi = {
  "selector" : {
    "light": "selectorLightMode",
    "dark": "selectorDarkMode"
  }
}

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {

  const [mode, setMode] = useState("light");
  function setAndValidateMode(newMode) {
    switch (newMode) {
      case "light":
      case "dark":
        setMode(newMode)
        break;

      default:
        console.error(`unknown display mode ${newMode}. mode not changed`)
        break;
    }
  }

  function getModeSelector(className) {
    return <select className={className}  value={mode} onChange={(e) => { setAndValidateMode(e.target.value) }}>
      <option value="light">Light Mode</option>
      <option value="dark">Dark Mode</option>
    </select>
  }

  function getMsi(className)
  {
    return msi[className][mode];
  }

  return (
    <>
      <ModeContext.Provider value={{ setMode: setAndValidateMode, mode, getModeSelector, getMsi }}>
        {children}
      </ModeContext.Provider>
    </>
  );
};

export const useMode = () => useContext(ModeContext);
