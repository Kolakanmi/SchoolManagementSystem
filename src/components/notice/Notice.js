import React from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faAngleDown, faTimes} from '@fortawesome/free-solid-svg-icons';


function AllNoticeList(props){

  return(
    <div className='flex-fill' style={{}}>
      <span>16th May, 2019</span><br/>
      <span>Jennifer Lopez <small>5mins ago</small></span><br/>
      <span>Great school management app</span>
      <hr/>
    </div>
  );
}

function AllNotice(props){

  return(
    <div className='d-flex flex-column flex-fill px-2 shadow' style={{backgroundColor: 'white', width: '100%', display: 'flex', overflowX: 'auto'}}>
      <div className='d-flex'>
        <strong className='align-self-center'>Notice Board</strong>
        <div className='d-flex align-items-center mx-2 my-sm-2 m-auto'>
          <input className='form-control form-control-sm mr-1'/>
          <input className='form-control form-control-sm mr-1'/>
          <button className='form-control form-control-sm' style={{backgroundColor: '#264d73', color: 'white', maxWidth: '60px'}}>Search</button>
        </div>
        <span className='ml-auto align-self-center flex-wrap'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} />
          <FontAwesomeIcon icon={faSync} className='ml-2' size='sm' style={{color: 'green'}}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}}/>
        </span>
        
      </div>
      <hr style={{margin:'0px', backgroundColor: 'black'}}/>
      <div style={{display: 'flex', overflowX: 'auto'}}>
        <AllNoticeList/>  
      </div>

    </div>
  );
}

function Notice(props){

  return(
    <div className='d-flex flex-wrap'>
      <div style={{backgroundColor: 'white'}} className='shadow mr-2 mb-4'>
        <SectionHeader sTitle={'Create A Notice'}/>
        <div>
          <form className='mx-2'>
            <div className='my-3'>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Title</label>
                <input name='noticetitle' />
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Details</label>
                <input name='noticedetails' />
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Posted By</label>
                <input name='postedby'/>
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Date</label>
                <input name='date' type='date'/>
              </div>
          
            </div>

            
            <div>
              <button>Save</button>
            </div>

          </form>
        </div>
      </div>
      <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
        <AllNotice/>
      </div>
    </div>
  );
}

export default Notice;