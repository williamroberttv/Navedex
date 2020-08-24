import React, { useEffect } from 'react';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import logo from '../../assets/logo.svg';
import './styles.css';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

function Login() {
  const history = useHistory();
  const token = localStorage.getItem('token');

  async function handleLogin({ email, password }) {
    try {
      const response = await api.post('users/login', { email, password });
      const { token } = response.data;
      await localStorage.setItem('token', token);
      history.push('/home');
    } catch (err) {
      alert('Oooops... Usuário ou senha inválido!');
    }
  }

  useEffect(() => {
    if (token) {
      history.push('/home');
    }
  }, [history, token]);
  return (
    <div className="login-page">
      <main className="login-section">
        <div className="logo">
          <img src={logo} alt="Nave Logo" />
        </div>
        <Form onSubmit={handleLogin}>
          <Input name="email" type="email" placeholder="E-mail" />
          <Input name="password" type="password" placeholder="Senha" />
          <button type="submit">Enviar</button>
        </Form>
      </main>
    </div>
  );
}

export default Login;
