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
  const token = localStorage.getItem('token');
  const [modalOpen, setModalOpen] = useState(false);

  async function changeValue(dataToTransform, dataToSubmit, setToFalse) {
    if (dataToTransform === 'birthdateValue') {
      const inputValue = await formRef.current.getFieldValue(dataToTransform);

      await setToFalse(false);
      formRef.current.setFieldValue(
        dataToSubmit,
        moment(inputValue).format('DD/MM/YYYY')
      );

      formRef.current.setFieldValue(
        dataToTransform,
        2020 - moment(inputValue).format('YYYY')
      );
    } else {
      const inputValue = await formRef.current.getFieldValue(dataToTransform);
      formRef.current.setFieldValue(
        dataToSubmit,
        moment(inputValue).format('DD/MM/YYYY')
      );
      await setToFalse(false);
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

      const { name, project, url, birthdate, admission_date, job_role } = data;

      const dataPost = {
        job_role,
        admission_date,
        birthdate,
        project,
        name,
        url,
      };

      await api.put(`navers/${naver.id}`, dataPost, {
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
      } else {
        alert('Algo deu errado, tente novamente.');
      }
    }
  }

  useEffect(() => {
    if (naver) {
      formRef.current.setData({
        name: naver.name,
        job_role: naver.job_role,
        project: naver.project,
        url: naver.url,
        birthdateValue: 2020 - moment(naver.birthdate).format('YYYY'),
        birthdate: moment(naver.birthdate).format('DD/MM/YYYY'),
        admission_date: moment(naver.admission_date).format('DD/MM/YYYY'),
        admission_dateValue: moment(naver.admission_date).fromNow(true),
      });
    } else {
      history.push('/home');
    }
  }, [history, naver]);

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
