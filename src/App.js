import React from 'react';
import Routes from './Routes';
import './assets/styles/global.css';
import { NaverProvider } from './context/ContextProvider';

function App() {
  return (
    <NaverProvider>
      <Routes />
    </NaverProvider>
  );
}

export default App;
