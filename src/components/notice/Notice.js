import React, {useContext, useEffect, useState} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faTimes} from '@fortawesome/free-solid-svg-icons';
import useCollapseState from '../../lib/CollapseState';
import {AppContext} from '../../contexts/AppContext';
import {Form, FormGroup, Input, Label, Row} from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import axios from "axios";
import useAxiosConfig from "../../lib/AxiosConfig";
import {Redirect} from 'react-router-dom'


export function AllNoticeList({notice, dispatch, onClickEdit}){

  let colors = ['green', 'blue', 'red', 'brown', 'purple', 'teal', 'orange'];

  function elapsedDate(date) {
    let d = new Date();
    let datePosted = new Date(date);
    let minutesElapsed = new Date(d - datePosted).getMinutes();
    let hoursElapsed = new Date(d - datePosted).getHours();
    let daysElapsed = new Date(d - datePosted).getDate();
    if (minutesElapsed < 60) {
      return minutesElapsed + "minute(s) ago"
    } else if (minutesElapsed > 60 && minutesElapsed < 1440){
      return hoursElapsed + "hour(s) ago"
    } else {
      return daysElapsed + "day(s) ago"
    }
  }

  return(
    <div className='flex-fill' style={{}}>
      {notice.sort((a,b) => {return a.datePosted - b.datePosted}).map(noti => {return <div key={noti.datePosted}>
        <span>{noti.title}</span><br/>
        <span style={{color: colors[Math.floor(Math.random()*colors.length)]}}>{noti.postedBy} <small style={{color: 'black'}}>
          {elapsedDate(noti.datePosted)}</small></span><br/>

        <span>{noti.details}</span>
        <hr/>
      </div>})}
      
      
    </div>
  );
}

function AllNotice({notice, dispatch, onClickEdit}){

  const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

  const collapsableStyle = {
    display: isCollapse ? 'none': 'flex'
  };

  const closeStyle = {
    display: isClosed ? 'none': 'flex'
  };

  return(
    <div className='flex-column flex-fill px-2 shadow' style={{...closeStyle, backgroundColor: 'white', width: '100%', overflowX: 'auto'}}>
      <div className='d-flex'>
        <strong className='align-self-center'>Notice Board</strong>
        <span className='ml-auto align-self-center flex-wrap'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} onClick={collapseButton} />

          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}} onClick={closeButton}/>
        </span>
        
      </div>
      <hr style={{margin:'0px', backgroundColor: 'black'}}/>
      <div style={{...collapsableStyle, overflowX: 'auto'}}>
        <AllNoticeList notice={notice} dispatch={dispatch} onClickEdit = {onClickEdit}/>  
      </div>

    </div>
  );
}

export function Notice(){

  const [state, dispatch] = useContext(AppContext);

  let notice = state.notice;

  const initialNotice = {
    title: '',
    details: '',
    postedBy: '',
    datePosted: '',
  };


  const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

  //const [editableNoticeId, setEditableNoticeId] = useState(false);


  //let editableNotice = initialNotice;
  
  /* if(editableNoticeId) {
    if(state.notice.length !== 0){
      editablenotice = state.notice.find(host => host.noticeName === editableNoticeId);    
    }   
  } */

  const [newNotice, setNewNotice] = useState(initialNotice);

  let config = useAxiosConfig();

  /*function onClickEdit(x) {
    setEditableNoticeId(true);
    setNewNotice({...x});
  }*/

  useEffect(() => {
    
  });


  const collapsableStyle = {
    display: isCollapse ? 'none': 'block'
  };

  const closeStyle = {
    display: isClosed ? 'none': 'block'
  };

  function onInputChange(e) {
    const target = e.target;
    newNotice[target.name] = target.value;
    setNewNotice({...newNotice});
  }

  function handleAddNotice(event){
    event.preventDefault();

    const date = new Date();
    newNotice.datePosted = date.toISOString();
    setNewNotice({...newNotice});

    async function postNotice() {
      let action;
        await axios.post('/v1/api/post-notice', JSON.stringify(newNotice), config)
            .then(result => {
              if (result.status === 200) {
                action = {type: 'ADD_NOTICE', payload: result.data};
                console.log('AddNotice');
                dispatch(action);
              } if (result.status === 401) {
                return <Redirect to='/login'/>
              }
            })
            .catch(error => {
              console.log(error)
              return <Redirect to='/login'/>
            })
    }

    postNotice();

    setNewNotice({...initialNotice});
    
  }

  return(
    <div className='d-flex flex-wrap'>
      <div style={{...closeStyle, backgroundColor: 'white'}} className='shadow mr-2 mb-4 flex-fill'>
        <SectionHeader sTitle={'Create A Notice'} toggleCollapse = {collapseButton} toggleClose = {closeButton}/>
        <div className='px-3' style={{...collapsableStyle}}>
        <Form className='px-2 ' onSubmit={handleAddNotice}>
          <Row className='d-flex flex-wrap flex-column'>
            <FormGroup className='flex-fill mr-3'>
              <Label>Title</Label>
              <Input name='title' value={newNotice.title} onChange={onInputChange}/>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Details</Label>
              <Input name='details' type='textarea' value={newNotice.details} onChange={onInputChange}/>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Posted By</Label>
              <Input name='postedBy' value={newNotice.postedBy} onChange={onInputChange} />
            </FormGroup>
          </Row>
          <Button style={{backgroundColor: 'teal'}} type='submit'>Save</Button>
        </Form>  
        </div>
      </div>
      <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
        <AllNotice notice={notice} dispatch={dispatch} />
      </div>
    </div>
  );
}
