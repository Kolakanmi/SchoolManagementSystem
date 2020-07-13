import React, {useContext}from 'react';
import StudParTeacSummary from './StudParTeacSummary';
import {AllNoticeList} from "../notice/Notice";
import {AppContext} from "../../contexts/AppContext";

function Dashboard(props){

    const [state, dispatch] = useContext(AppContext);
    let {notice} = state;
  return(
    <div className='px-2 px-md-1'>
      <StudParTeacSummary/>
      {/*<AllNoticeList notice={notice}/>*/}
    </div>
  )
}

export default Dashboard;