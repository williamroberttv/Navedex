import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import AddNaver from '../pages/AddNaver';
import EditNaver from '../pages/EditNaver';

function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/add" component={AddNaver} />
      <Route path="/edit" component={EditNaver} />
    </BrowserRouter>
  );
}

export default Routes;
