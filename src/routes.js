import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PreRegister from 'pages/PreRegister';
import Login from 'pages/Login'
import Statistics from 'pages/Statistics'
import { sessionService } from 'redux-react-session'
import Home from 'pages/Home';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={PreRegister} />
        <Route onEnter={sessionService.checkAuth} path='/panel' exact component={Home} />
        <Route path='/statistics' exact component={Statistics} />
        <Route path='/login' exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
}