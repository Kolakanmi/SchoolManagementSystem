import React from 'react';
//import logo from './logo.svg';
//import './bootstrap.css';
import './App.css';
//import HelloWorld from './components/HelloWorld.js';
import Sidebar from './components/Sidebar.js';
import RouterView from './components/RouterView.js';
import TopHeader from './components/TopHeader';

function App() {
  return (
    <div className="container-fluid d-flex" style = {{border: "2px solid red", color: "white", padding: "0px"}}>  
      {/* <HelloWorld> Kola </HelloWorld>  */}
      <Sidebar/>
      <div className='col-12 col-sm-10' style={{minHeight: '100%', margin: '0px', padding: '0px', color: 'black', backgroundColor: '#d3d3d3'}}>
        <TopHeader/>
        <RouterView/> 
      </div>
    
      
    </div>
  );
}

export default App;
