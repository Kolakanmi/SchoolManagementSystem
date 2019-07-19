import React from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, DropdownMenu, DropdownItem, DropdownToggle} from 'reactstrap'
import {useState} from 'react'

function SidebarItem(props){
  let [isOpen, setIsOpen] = useState(false);

  let dropdownTogStyle = {
    backgroundColor: 'inherit', 
    width: '100%', 
    height: '40px', 
    textAlign: 'left', 
    margin: '0px'
  }
  let dropdownItemStyle = {
    color: 'white',
    ':hover': {
      color: 'blue',
      backgroundColor: 'blue'
    }
  }

  let item = props.children;
  function someFunction(x) {
    if (!x.drops) {
      return <div style={{clear: 'both', height:'40px', border: '0.5px solid white'}} className='pl-3 d-flex align-items-center'><Link className='dropitem' to={x.link[0]}>{item.name}</Link></div>
    } else {
      return (
        <Dropdown style={{border: '0.5px solid white', position: 'relative'}} isOpen={isOpen}>
          <DropdownToggle onClick= {() => setIsOpen(!isOpen)} style={dropdownTogStyle} className='pl-3' caret >
            {x.name}
          </DropdownToggle>
          <DropdownMenu style={{border: '0.5px solid white',backgroundColor: 'inherit', width: '100%', color: 'white', position: 'relative'}}>
            {x.drops.map((v, i) => { let l = x.link[i];
              return <DropdownItem key={i} className='dropitem' style={dropdownItemStyle}><Link className='dropitem' key={i} to={l === x.link[1] ? l + 1 : l}>{v}</Link></DropdownItem>
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

export default SidebarItem;