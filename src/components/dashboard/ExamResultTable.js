import React from 'react';

function ExamResultTableBody(props) {

  let exam = props.exam;

  return(
    <tbody>
      <tr>
        <td>{exam.name}</td>
        <td>{exam.subject}</td>
        <td>{exam.position}</td>
        <td>{exam.percent}</td>
        <td>{exam.session}</td>
        <td>{exam.term}</td>
    </tr>
    </tbody>
  );
}

function ExamResultTable(props){

  let allExams = props.allExams;

  return(
    <div className='' style={{maxWidth: '100%', display: 'flex', overflowX: 'auto'}}>
      <table className='table' style={{width: '100%'}}>
        <thead>
          <tr>
            <th>Exam</th>
            <th>Subject</th>
            <th>Rank</th>
            <th>%</th>
            <th>Session</th>
            <th>Term</th>
          </tr>
        </thead>
        {allExams.map(e => {
          return <ExamResultTableBody key= {e.id} exam={e} />
        })}
      </table>
    </div>
  );
}

export default ExamResultTable;