import React, {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faSync,
    faTimes
} from '@fortawesome/free-solid-svg-icons'
import StudFeesExamDoc from './StudFeesExamDoc';
import NoticeBoard from './NoticeBoard';
import ParentAllExpenses from './ParentAllExpenses'
import {AppContext} from '../../contexts/AppContext';
import RavePaymentModal from 'react-ravepayment'
import {ravePublicKey} from "../../lib/RavePublicKey";
import axios from 'axios';


function SingleChild({child, email, index, profile}){

    let totalFees = child.fees.reduce((acc, item) => {
        return acc + item.amountDue
    }, 0);

   let getReference = () => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( let i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };
    let config = {
        headers: {
            'Authorization': profile.token
        }
    };
    let callback = (response) => {
       let txRef = response.tx.txRef;
       console.log("response ", response, txRef);
       axios.get("/v1/api/verify-transaction/"+txRef, config).then(res => {
           console.log(res.status, res.data, res.statusText)
       })
    };

    let close = () =>{
       console.log("Closed")
    };

  return(
    <div className='flex-fill px-2 my-3 shadow' style={{backgroundColor: 'white', width: '100%'}}>
      <div className='d-flex'>
        <strong>My Child_0{"" + index}</strong>
        <span className='ml-auto'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} />
          <FontAwesomeIcon icon={faSync} className='ml-2' size='sm' style={{color: 'green'}}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}}/>
        </span>
        
      </div>
      <hr style={{margin:'0px', backgroundColor: 'black'}}/>
      <div className='d-flex flex-wrap flex-fill'>
        <div className='my-sm-2' style={{padding: '0px'}}>
            <img style={{width: '100px', height: '100px'}} src={'/' + child.picture} alt='student'/>
          {/*<div className='d-flex my-2'>
            <FontAwesomeIcon icon={faEdit} className='flex-fill mr-2' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faSave} className='flex-fill mr-2' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faDownload} className='flex-fill mr-2' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faShare} className='flex-fill' style={{backgroundColor: 'grey'}} />
          </div>*/}
        </div>
        <div className='my-sm-2 flex-fill' style={{padding: '0px', fontSize: '0.8rem', wordWrap: 'break-word'}}>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Name:</p> <p className='col-8 pl-2 px-sm-2'><strong>{child.firstName}</strong></p></div>
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Admission Number:</p> <p className='col-8 pl-2 px-sm-2'><strong>{child.admissionNumber}</strong></p></div>
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Gender:</p> <p className='col-8 pl-2 px-sm-2'><strong>{child.gender}</strong></p></div>
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Class:</p> <p className='col-8 pl-2 px-sm-2'><strong>{child.class}</strong></p></div>
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Section:</p> <p className='col-8 pl-2 px-sm-2'><strong>{child.section}</strong></p></div>
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Admission Date:</p> <p className='col-8 pl-2 px-sm-2'><strong>{new Date(child.dateOfBirth).toDateString()}</strong></p></div>
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Due Fees:</p> <p className='col-8 pl-2 px-sm-2'><strong>{totalFees}</strong>
              <RavePaymentModal class='mx-2 btn-primary' close={close} isProduction={true} callback={callback} text={'PAY'} email={email} amount={totalFees} ravePubKey={ravePublicKey} reference={child.admissionNumber + getReference()}/>
          </p></div>
        </div>
      </div>

    </div>
  );
}

function ParentsDashboard(){

  const [state, dispatch] = useContext(AppContext);

  let {notice} = state;

  let profile = state.profile;
    let email = profile.details.email;

  return(
    <div className='d-flex flex-wrap-reverse'>
      <div className=''>
          {profile.details.children.map((c, i) => {
              return <SingleChild key={i} child={c} index={i+1} email={email} profile={profile}/>
          })}
      </div>
      <div className='d-flex flex-column flex-fill my-2' style={{display: 'flex', overflowX: 'auto'}}>
        <StudFeesExamDoc profile = {profile}/>
        <NoticeBoard notice={notice}/>
        <ParentAllExpenses profile = {profile}/>
      </div>
    </div>
  );
}

export default ParentsDashboard;