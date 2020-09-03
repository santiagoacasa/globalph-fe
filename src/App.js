import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Profile from './components/Profile';


function App() {
  const initialState = {
    loggedInUser: null,
    photographers: []
  }

  const [state, setState] = useState(initialState)

  const getTheUser = (userObj) => {
    setState({
      loggedInUser: userObj
    })
  }

  const updatePhotographers = photographers => {
    setState({
      ...state,
      photographers: photographers
    })
  }

  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path="/" render={props => <Home {...props} callbackGetUser={getTheUser} callbackUpdatePhs={updatePhotographers} loggedUser={state.loggedInUser}/>} />
        <Route path="/signup" render={props => <Signup {...props} callbackGetUser={getTheUser}/>} />
        <Route path="/login" render={props => <Login {...props} callbackGetUser={getTheUser}/>} />
        <Route exact path="/logout" render={(props) => <Logout {...props} callbackGetUser={getTheUser} />}/>
        <Route path="/profile" render={(props) => <Profile {...props} loggedUser={state.loggedInUser}/>} />
      </Switch>
    </div>
  );
}

export default App;
