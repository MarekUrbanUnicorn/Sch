import React, { createContext, useContext, useState, useEffect } from 'react';


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


const SizeContext = createContext();


export const SizeProvider = ({ children }) => {
  const size = useWindowDimensions();
  
  return (
    <>
      <SizeContext.Provider value={size}>
        {children}
      </SizeContext.Provider>
    </>
  );
};

export const useSize = () => useContext(SizeContext);

