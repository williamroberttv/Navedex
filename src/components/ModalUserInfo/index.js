import React from 'react';
import { useHistory } from 'react-router-dom';
import { MdClose, MdDelete, MdCreate } from 'react-icons/md';

import { useNaver } from '../../context/ContextProvider';
import ModalBlur from '../ModalBlur';
import './styles.css';

function ModalUserInfo({ action, data, deleteFunc, deleteModal }) {
  const { handleNaver } = useNaver();
  const history = useHistory();

  function handleEdit(naver) {
    handleNaver(naver);
    localStorage.setItem('id', naver.id);
    history.push('/edit');
  }

  return (
    <div className="modal-user">
      <div className="user">
        <div className="user-img">
          <img src={data.url} alt={`Foto de ${data.name}`} />
        </div>
        <div className="user-section">
          <div className="closebutton">
            <MdClose size={32} onClick={() => action(false)} />
          </div>
          <div className="user-details">
            <h1>{data.name}</h1>
            <p>{data.job_role}</p>

            <h3>Idade</h3>
            <p>{data.birthdate}</p>

            <h3>Tempo de Empresa</h3>
            <p>{data.birthdate}</p>

            <h3>Projetos que participou</h3>
            <p>{data.project}</p>
            <div className="user-buttons">
              <MdDelete size={28} onClick={() => deleteModal(true)} />
              <MdCreate size={28} onClick={() => handleEdit(data)} />
            </div>
          </div>
        </div>
      </div>
      <ModalBlur />
    </div>
  );
}

export default ModalUserInfo;
