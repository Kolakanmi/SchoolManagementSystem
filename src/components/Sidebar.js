import React from 'react';
import SidebarItem from './SidebarItem'
import SideHeader from './SideHeader';
import SidebarItemsArray from '../lib/SidebarItemsArray';
import '../lib/css/sidebar.css'


function Sidebar(props){
  let items = SidebarItemsArray;

  return(
    <div className='d-none d-sm-block col-2' style= {{backgroundColor: '#264d73', height: '100%', margin: '0px', padding: '0px'}}>
      <SideHeader/>
      <div >
      {items.map(e => {
        return <SidebarItem key= {e.id} children = {e}/>
      })}
      </div>
    </div>
  );
}

export default Sidebar;