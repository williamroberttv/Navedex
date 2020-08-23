import React from 'react';
import { MdClose } from 'react-icons/md';

import ModalBlur from '../ModalBlur';
import './styles.css';

function ModalConfirm({ deleteFunc, action }) {
  return (
    <div>
      <div className="modal-delete">
        <div className="modal-delete-title">
          <h1>Excluir Naver</h1>
          <MdClose size={22} onClick={() => action(false)} />
        </div>
        <p>Tem certeza que deseja excluir este Naver?</p>
        <div className="modal-delete-confirm">
          <button id="cancel-button" onClick={() => action(false)}>
            Cancelar
          </button>
          <button onClick={deleteFunc}>Excluir</button>
        </div>
      </div>
      <ModalBlur />
    </div>
  );
}

export default ModalConfirm;
