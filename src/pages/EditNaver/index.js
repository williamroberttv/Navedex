import React, { useState, useRef, useEffect } from 'react';
import * as moment from 'moment';
import { useNaver } from '../../context/ContextProvider';
import api from '../../services/api';
import FormComponent from '../../components/FormComponent';
import ModalConfirm from '../../components/ModalConfirm';

function EditNaver() {
  const [modalOpen, setModalOpen] = useState(false);
  const formRef = useRef();
  const { naver } = useNaver();
  const storagedId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const [naverInfo, setNaverInfo] = useState({});

  async function changeValue(dataToTransform, dataToSubmit, setToFalse) {
    const inputValue = await formRef.current.getFieldValue(dataToTransform);

    await setToFalse(false);
    formRef.current.setFieldValue(
      dataToSubmit,
      moment(inputValue).format('DD/MM/YYYY')
    );

    if (dataToTransform === 'birthdateValue') {
      formRef.current.setFieldValue(
        dataToTransform,
        2020 - moment(inputValue).format('YYYY')
      );
    } else {
      const inputValueDate = moment(inputValue).format('YYYY/MM/DD').split('/');
      formRef.current.setFieldValue(
        dataToTransform,
        moment(inputValueDate).fromNow(true)
      );
    }
  }

  async function handleSubmit(data) {
    const { name, project, url, job_role, birthdate, admission_date } = data;

    const dataPost = {
      job_role,
      admission_date,
      birthdate,
      project,
      name,
      url,
    };
    try {
      await api.put(`navers/${storagedId}`, dataPost, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function getUserDetails(authToken, userId, userInfo) {
    const response = await api.get(`navers/${userId}`, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
    setNaverInfo(response.data);
    formRef.current.setData({
      name: userInfo.name,
      job_role: userInfo.job_role,
      project: userInfo.project,
      url: userInfo.url,
      birthdateValue: 2020 - moment(userInfo.birthdate).format('YYYY'),
      birthdate: userInfo.birthdate,
      admission_date: userInfo.admission_date,
      admission_dateValue: moment(userInfo.admission_date).fromNow(true),
    });
  }

  useEffect(() => {
    if (naver) {
      formRef.current.setData({
        name: naver.name,
        job_role: naver.job_role,
        project: naver.project,
        url: naver.url,
        birthdateValue: 2020 - moment(naver.birthdate).format('YYYY'),
        birthdate: naver.birthdate,
        admission_date: naver.admission_date,
        admission_dateValue: moment(naver.admission_date).fromNow(true),
      });
    } else {
      getUserDetails(token, storagedId, naverInfo);
    }
  }, [naver, naverInfo, storagedId, token]);

  return (
    <FormComponent
      title="Editar"
      formRef={formRef}
      submitFunc={handleSubmit}
      dateFunc={changeValue}
    >
      {modalOpen && <ModalConfirm title="editado" action={setModalOpen} />}
    </FormComponent>
  );
}

export default EditNaver;
