import React, { useState, useRef } from 'react';
import * as moment from 'moment';

import api from '../../services/api';
import FormComponent from '../../components/FormComponent';
import ModalConfirm from '../../components/ModalConfirm';

function AddNaver() {
  const [modalOpen, setModalOpen] = useState(false);
  const formRef = useRef();

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

  async function handleSubmit(data, { reset }) {
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
      const token = localStorage.getItem('token');
      await api.post('navers', dataPost, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      reset();
      setModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <FormComponent
      formRef={formRef}
      title="Adicionar"
      submitFunc={handleSubmit}
      dateFunc={changeValue}
    >
      {modalOpen && <ModalConfirm title="adicionado" action={setModalOpen} />}
    </FormComponent>
  );
}

export default AddNaver;
