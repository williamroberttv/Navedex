import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Route from './route';
import Login from '../pages/Login';
import Home from '../pages/Home';
import AddNaver from '../pages/AddNaver';
import EditNaver from '../pages/EditNaver';

function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/home" isPrivate component={Home} />
      <Route path="/add" isPrivate component={AddNaver} />
      <Route path="/edit" isPrivate component={EditNaver} />
    </BrowserRouter>
  );
}

export default Routes;
