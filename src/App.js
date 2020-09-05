import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Profile from './components/profile/Profile';
import PhotographersList from './components/PhotographersList';
import NotFound  from './components/NotFound';


function App() {
  const initialState = {
    loggedInUser: null,
    photographers: []
  }

  const [state, setState] = useState(initialState)

  useEffect(() => {
    if(state.loggedInUser){
      return
    }
    const user = localStorage.getItem('loggedUser')
    if(user) {
      setState({
        ...state,
        loggedInUser: JSON.parse(user)
      })  
    }
  }, [state])

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
      <Navbar user={state.loggedInUser} key={state.loggedInUser}/>
      <Switch>
        <Route exact path="/" render={props => <Home {...props} callbackGetUser={getTheUser} callbackUpdatePhs={updatePhotographers} loggedUser={state.loggedInUser}/>} />
        <Route path="/signup" render={props => <Signup {...props} callbackGetUser={getTheUser} loggedUser={state.loggedInUser}/>} />
        <Route path="/login" render={props => <Login {...props} callbackGetUser={getTheUser} loggedUser={state.loggedInUser}/>} />
        <Route exact path="/logout" render={(props) => <Logout {...props} callbackGetUser={getTheUser} />}/>
        <Route path="/profile" render={(props) => <Profile {...props} loggedUser={state.loggedInUser}/>} />
        <Route path="/photographers" render={(props) => <PhotographersList {...props} loggedUser={state.loggedInUser}/>} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
