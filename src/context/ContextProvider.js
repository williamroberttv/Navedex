import React, { createContext, useState, useContext } from 'react';

const NaverContext = createContext();

export const NaverProvider = (props) => {
  const [naver, setNaver] = useState();
  const handleNaver = (param) => setNaver(param);

  return (
    <NaverContext.Provider value={{ naver, handleNaver }}>
      {props.children}
    </NaverContext.Provider>
  );
};

export const useNaver = () => {
  const context = useContext(NaverContext);

  if (!context) return null;

  return context;
};
