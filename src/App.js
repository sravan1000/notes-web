import React from 'react';
import Notes from './components/Notes';
import './App.css';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import Register from './Pages/Forms/Register';
import Login from './Pages/Forms/Login';
import Logout from './Pages/Forms/Logout';

function isUserLoggedIn(){
  let token = localStorage.getItem("token");
  if(token) { return true }else{ return false};
}
function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" render={() => (
        isUserLoggedIn() ? (
          <Redirect to="/notes" />
        ) : (
          <Redirect to="/login" />
        )
      )}/>
      <Route exact path="/login" render={() => (
        isUserLoggedIn() ? (
          <Redirect to="/notes" />
        ) : (
          <Redirect to="/login" />
        )
      )}/>
      <Route exact path = '/login' component= {Login} />
      <Route exact path = '/register' component= {Register} />
      <Route exact path="/notes" render={() => (
        isUserLoggedIn() ? (
          <Redirect to="/notes" />
        ) : (
          <Redirect to="/login" />
        )
      )}/>
      <Route  path = '/notes' component= {Notes} />  
      <Route  path = '/logout' component= {Logout} />  
    </BrowserRouter>
  );
}

export default App;
