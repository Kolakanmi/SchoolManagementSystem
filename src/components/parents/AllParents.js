import React, {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown,faEye, faTimes} from '@fortawesome/free-solid-svg-icons';
import {AppContext} from '../../contexts/AppContext';
import useCollapseState from '../../lib/CollapseState';
import {Link} from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios'
import useAxiosConfig from "../../lib/AxiosConfig";


function AllParentsTable({parents, dispatch}){

  let config = useAxiosConfig();

  function deleteParent(parent){

    async function deletePar() {
      axios.get('/v1/api/deleteParent/'+ parent.parentId, config)
          .then((response) => {
            if (response.status === 200) {
              let action = {type: 'DELETE_PARENT', payload: response.data};
              console.log('DeleteParent');
              dispatch(action);
            }
          })
    }

   // deletePar()

  }

  return(
    <div className='flex-fill' style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Occupation</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {parents.sort((a,b) => {return a.lastName - b.lastName}).map(parent => {return <tr key={parent.parentId}>
            <td>{parent.firstName + ' ' + parent.lastName}</td>
            <td>{parent.gender}</td>
            <td>{parent.occupation}</td>
            <td>{parent.email}</td>
            <td>{parent.mobileNumber} </td>
            <td>{parent.address}</td>
            <td className='flex-fill' style={{minWidth: '80px'}}>
              <Link to={'/parents/parent-details/'+parent.parentId}><FontAwesomeIcon className='mr-1' icon={faEye} style={{color: 'grey'}}/></Link>
             {/* <Link to={'/parents/edit-parent/'+parent.parentId}><FontAwesomeIcon className='mr-1' icon={faEdit} style={{color: 'green'}}/></Link>*/}
            </td>
          </tr>})}
        </tbody>
      </table>
    </div>
  );
}

function AllParents(props){

  const [state, dispatch] = useContext(AppContext);
  const parents = state.parents;
  const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

  const collapsableStyle = {
    display: isCollapse ? 'none': 'flex'
  };

  const closeStyle = {
    display: isClosed ? 'none': 'flex'
  };

  return(
    <div className='flex-column flex-fill px-2 my-3 shadow' style={{...closeStyle,backgroundColor: 'white', width: '100%', overflowX: 'auto'}}>
      <div className='d-flex'>
        <strong className='align-self-center'>All Parents</strong>
        {/*<div className='d-flex align-items-center mx-2 my-sm-2 m-auto'>
          <input className='form-control form-control-sm mr-1'/>
          <input className='form-control form-control-sm mr-1'/>
          <button className='form-control form-control-sm' style={{backgroundColor: '#264d73', color: 'white', maxWidth: '60px'}}>Search</button>
        </div>*/}
        <span className='ml-auto align-self-center flex-wrap'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} onClick={collapseButton} />
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}} onClick={closeButton}/>
        </span>
        
      </div>
      <hr style={{margin:'0px', backgroundColor: 'black'}}/>
      <div style={{...collapsableStyle, overflowX: 'auto'}}>
        <AllParentsTable parents={parents} dispatch={dispatch}/>  
      </div>

    </div>
  );
}

export default AllParents;