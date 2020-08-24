import React, { useState, useRef } from 'react';
import * as moment from 'moment';
import * as Yup from 'yup';

import { schema } from '../../utils/schema';
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
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, project, job_role, birthdate, admission_date } = data;
      const url = data.url ? data.url : 'https://i.imgur.com/UKHIeCy.png';

      const dataPost = {
        job_role,
        admission_date,
        birthdate,
        project,
        name,
        url,
      };
      const token = localStorage.getItem('token');
      await api.post('navers', dataPost, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      formRef.current.setErrors({});
      reset();
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
