import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdNavigateBefore } from 'react-icons/md';
import { Form } from '@unform/web';

import Header from '../Header';
import Input from '../Input';
import './styles.css';

function FormComponent({ title, submitFunc, children, formRef, dateFunc }) {
  const [typeOfInputDate, setTypeOfInputDate] = useState(false);
  const [typeOfInputBirthdate, setTypeOfInputBirthdate] = useState(false);

  return (
    <div className="form-page">
      <Header />
      <div>
        <div className="form-page-title">
          <Link to="/home">
            <MdNavigateBefore size={38} />
          </Link>
          <h1>{title} Naver</h1>
        </div>
        <Form ref={formRef && formRef} className="form" onSubmit={submitFunc}>
          <Input name="name" title="Nome" />
          <Input name="job_role" title="Cargo" />
          <Input
            name="birthdateValue"
            type={typeOfInputBirthdate ? 'date' : 'text'}
            title="Idade"
            onFocus={() => setTypeOfInputBirthdate(true)}
            onBlur={() =>
              dateFunc('birthdateValue', 'birthdate', setTypeOfInputBirthdate)
            }
          />

          <Input
            name="admission_dateValue"
            type={typeOfInputDate ? 'date' : 'text'}
            title="Tempo de empresa"
            onFocus={() => setTypeOfInputDate(true)}
            onBlur={() =>
              dateFunc(
                'admission_dateValue',
                'admission_date',
                setTypeOfInputDate
              )
            }
          />

          <Input name="project" title="Projetos que participou" />
          <Input name="url" title="URL da foto do Naver" />
          <div className="form-button-section">
            <button type="submit">{title}</button>
          </div>
          <Input className="ghost-input" name="birthdate" />
          <Input className="ghost-input" name="admission_date" />
        </Form>
      </div>
      {children}
    </div>
  );
}

export default FormComponent;
