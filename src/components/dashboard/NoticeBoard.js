import React from 'react';
import SectionHeader from './SectionHeader';
import {AllNoticeList} from "../notice/Notice";

function NoticeBoard({notice}) {

  return(
    <div>
      <SectionHeader sTitle={'Notice Board'}/>
      <AllNoticeList notice={notice}/>
    </div>
  );
}

export default NoticeBoard;