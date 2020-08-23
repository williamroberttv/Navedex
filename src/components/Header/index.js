import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './styles.css';

function Header() {
  const history = useHistory();

  function handleExit() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="header">
      <img src={logo} alt="Nave Logo" />
      <p onClick={handleExit}>Sair</p>
    </div>
  );
}

export default Header;
