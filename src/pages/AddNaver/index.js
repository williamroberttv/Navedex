import React from 'react';
import { Form } from '@unform/web';
import Input from '../../components/Input';

import './styles.css';

function AddNaver() {
  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <div className="form-section">
      <Form className="form" onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome" />
        <Input name="position" placeholder="Cargo" />
        <Input type="number" name="age" placeholder="Idade" />
        <Input name="time" placeholder="Tempo de empresa" />
        <Input name="projects" placeholder="Projetos que participou" />
        <Input name="url" placeholder="URL da foto do Naver" />
        <div className="button">
          <button type="submit">Enviar</button>
        </div>
      </Form>
    </div>
  );
}

export default AddNaver;
