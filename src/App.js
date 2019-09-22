import React, {useState} from 'react';
import {Route} from 'react-router-dom'
//import logo from './logo.svg';
//import './bootstrap.css';
import './App.css';
//import HelloWorld from './components/HelloWorld.js';
import Sidebar from './components/Sidebar.js';
import RouterView from './components/RouterView.js';
import TopHeader from './components/TopHeader';
import {AppProvider} from './contexts/AppContext';
import Log from "./components/Log";
import PrivateRoute from "./components/PrivateRoute";

function App() {

    const [auth, setAuth] = useState(false);
    return (
        <AppProvider>
            {/*<ProtectedRoute path="/" auth={auth} setAuth={setAuth} component={MainPage}/>*/}
                <PrivateRoute component={MainPage}/>

                <Route path='/login' component={Log}/>
        </AppProvider>
    );
}

export default App;

/*function ProtectedRoute({component: Component, ...rest}) {

    //const [auth, setAuth] = useState(false)

    let pr = rest
    let auth = pr.auth
    let setAuth = pr.setAuth
    console.log(auth)
    return (

    <Route
        {...rest}
        render={props => auth ? (<Component {...props}/>) :
            (
                <LoginPage {...{auth: auth, setAuth: setAuth, ...props}}/>
            )

        }
    />
    )
}*/



function MainPage(props) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="container-fluid d-flex"
             style={{height: "100%", color: "white", padding: "0px"}}>
            <Sidebar {...props} isOpen={isOpen}/>
            <div className='flex-fill col-md-10'
                 style={{minHeight: '99.9vh', margin: '0px', padding: '0px', color: 'black', backgroundColor: '#d3d3d3'}}>
                <TopHeader {...props} isOpen={isOpen} setIsOpen={setIsOpen}/>
                <RouterView {...props} isOpen={isOpen} setIsOpen={setIsOpen}/>

            </div>

        </div>
    );
}

{/*<Route
            {...rest}
            render={props => auth ? (<Component {...props}/>) :
                (
                    <LoginPage {...{auth: auth, setAuth: setAuth, ...props}}/>
                )

            }
        />*/}


{/*<div>
            {auth ? <Route path='/main' auth={auth} setAuth={setAuth} render = {props => {
                return <MainPage {...{auth: auth, setAuth: setAuth, ...props}}/>
            }}/> : <Route path='/login' auth={auth} setAuth={setAuth} render = {props => {
                return <LoginPage {...{auth: auth, setAuth: setAuth, ...props}}/>
            }}/>}
        </div>*/}