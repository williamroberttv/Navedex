import React, { useState, useEffect } from 'react';
import { MdCreate, MdDelete } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';

import { useNaver } from '../../context/ContextProvider';
import api from '../../services/api';
import Header from '../../components/Header';
import ModalUserInfo from '../../components/ModalUserInfo';
import ModalDelete from '../../components/ModalDelete';

import './styles.css';
import ModalConfirm from '../../components/ModalConfirm';

function Home() {
  const token = localStorage.getItem('token');
  const [navers, setNavers] = useState([]);
  const [naverInfo, setNaverInfo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
  const [naverId, setNaverId] = useState();
  const { handleNaver } = useNaver();
  const history = useHistory();

  function handleDeleteModal(id) {
    setDeleteModalOpen(true);
    setNaverId(id);
  }

  function handleOpenModal(param) {
    setNaverInfo(param);
    setModalOpen(true);
  }

  function handleEdit(naver) {
    handleNaver(naver);
    history.push('/edit');
  }

  async function getNavers(auth) {
    const response = await api.get('navers', {
      headers: {
        authorization: `Bearer ${auth}`,
      },
    });
    setNavers(response.data);
  }

  async function deleteNaver() {
    try {
      setDeleteModalOpen(false);
      setModalOpen(false);
      await api.delete(`navers/${naverId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setModalConfirmDelete(true);
      getNavers(token);
    } catch (error) {
      alert('Algo deu errado, tente novamente.');
    }
  }

  useEffect(() => {
    getNavers(token);
  }, [token]);

  return (
    <div className="home-page">
      <Header />
      <div className="title-section">
        <h1>Navers</h1>
        <Link to="/add">
          <button>Adicionar Naver</button>
        </Link>
      </div>
      <div className="main">
        {navers.map((naver) => (
          <div key={naver.id} className="navers">
            <div className="img-div">
              <img
                src={naver.url}
                alt={`Foto de ${naver.name}`}
                onClick={() => {
                  handleOpenModal(naver);
                  setNaverId(naver.id);
                }}
              />
            </div>
            <h3>{naver.name}</h3>
            <p>{naver.job_role}</p>
            <div className="buttons">
              <MdDelete size={20} onClick={() => handleDeleteModal(naver.id)} />
              <MdCreate size={20} onClick={() => handleEdit(naver)} />
            </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <ModalUserInfo
          action={setModalOpen}
          deleteModal={setDeleteModalOpen}
          data={naverInfo}
          deleteFunc={deleteNaver}
        />
      )}
      {deleteModalOpen && (
        <ModalDelete action={setDeleteModalOpen} deleteFunc={deleteNaver} />
      )}
      {modalConfirmDelete && (
        <ModalConfirm title="excluído" action={setModalConfirmDelete} />
      )}
    </div>
  );
}

export default Home;
