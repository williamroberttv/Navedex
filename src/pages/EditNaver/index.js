import React, { useState, useRef, useEffect } from 'react';
import * as moment from 'moment';
import * as Yup from 'yup';

import { schema } from '../../utils/schema';
import { useNaver } from '../../context/ContextProvider';
import api from '../../services/api';
import FormComponent from '../../components/FormComponent';
import ModalConfirm from '../../components/ModalConfirm';
import { useHistory } from 'react-router-dom';

function EditNaver() {
  const history = useHistory();
  const formRef = useRef();
  const { naver } = useNaver();
  const storagedId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const [modalOpen, setModalOpen] = useState(false);
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
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, project, url, job_role, birthdate, admission_date } = data;

      const dataPost = {
        job_role,
        admission_date,
        birthdate,
        project,
        name,
        url,
      };

      await api.put(`navers/${storagedId}`, dataPost, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      formRef.current.setErrors({});
      setModalOpen(true);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};
        error.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
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
    } else if (!naver) {
      getUserDetails(token, storagedId, naverInfo);
    } else {
      history.push('/home');
    }
  }, [history, naver, naverInfo, storagedId, token]);

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
