import React from 'react';
import { MdClose } from 'react-icons/md';

import ModalBlur from '../ModalBlur';
import './styles.css';

function ModalConfirm({ title, action }) {
  return (
    <div>
      <div className="modal">
        <div className="modal-title">
          <h1>Naver {title}</h1>
          <MdClose size={22} onClick={() => action(false)} />
        </div>
        <p>Naver {title} com sucesso!</p>
      </div>
      <ModalBlur />
    </div>
  );
}

export default ModalConfirm;
