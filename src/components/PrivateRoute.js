import Auth from "../lib/Auth";
import React from "react";
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login'/*,
                state: { from: props.location }*/
            }} />
    )} />
);

export default PrivateRoute