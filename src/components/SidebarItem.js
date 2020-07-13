import React from 'react';
import {Link, Redirect, Route, withRouter} from 'react-router-dom';
import {Dropdown, DropdownMenu, DropdownItem, DropdownToggle} from 'reactstrap'
import {useState} from 'react'

function SidebarItem(props){
  let [isOpen, setIsOpen] = useState(false);
  let {barIsOpen, setBarIsOpen} = props;

  let dropdownTogStyle = {
    backgroundColor: 'inherit', 
    width: '100%', 
    height: '50px',
    textAlign: 'left', 
    margin: '0px'
  };
  let dropdownItemStyle = {
    color: 'white'
    /*':hover': {
      color: 'blue',
      backgroundColor: 'blue'
    }*/
  };

  let item = props.children;
  const tog = () => {
    setIsOpen(!isOpen);
  };
  function someFunction(x) {
    if (!x.drops) {
      return <div style={{clear: 'both', height:'50px'}} className='pl-3 d-flex align-items-center'><Link className='dropitem' onClick={() => {setBarIsOpen(!barIsOpen)}} to={x.link[0]}>{item.name}</Link></div>
    } else {
      return (
        <Dropdown style={{position: 'relative'}} isOpen={isOpen} toggle={tog} >
          <DropdownToggle style={dropdownTogStyle} className='pl-3' caret >
            {x.name}
          </DropdownToggle>
          <DropdownMenu style={{backgroundColor: 'inherit', width: '100%', color: 'white', position: 'relative'}}>
            {x.drops.map((v, i) => { let l = x.link[i];
              return <DropdownItem key={i} className='dropitem' style={dropdownItemStyle}><Link className='dropitem' onClick={() => {setBarIsOpen(!barIsOpen)}} key={i} to={l}>{v}</Link></DropdownItem>
            })}
          </DropdownMenu>
        </Dropdown>
      )
    }
  }
  
  return(
    <div>
      {someFunction(item)}
    </div>
  );
}

export default withRouter(SidebarItem);