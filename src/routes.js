import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PreRegister from 'pages/PreRegister';
import Login from 'pages/Login'
import Statistics from 'pages/Statistics'
import Contato from 'pages/Contato'
import { sessionService } from 'redux-react-session'
import Home from 'pages/Home';
import ResetPwd from 'pages/ResetPwd';


export default function Routes({token}) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={PreRegister} />
        <Route onEnter={sessionService.checkAuth} path='/panel' exact component={Home} />
        <Route path='/statistics' exact component={Statistics} />
        <Route path='/login' exact component={Login} />
        <Route path='/reset' exact component={ResetPwd} />
        <Route path='/contact' exact component={Contato} />
      </Switch>
    </BrowserRouter>
  );
}