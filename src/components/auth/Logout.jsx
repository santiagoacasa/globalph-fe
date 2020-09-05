import React from 'react'
import { Redirect } from 'react-router-dom';
import AuthService from '../../helpers/auth/auth-service'

const Logout = props => {
    const authService = new AuthService()

    authService.logout()
    .then(response => {
        localStorage.clear()
        props.callbackGetUser(null);
    })
    .catch(error => console.log(error))

    return (
        <Redirect to={'/'} />
    )
}

export default Logout
