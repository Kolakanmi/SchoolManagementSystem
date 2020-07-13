import React, {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faTimes} from '@fortawesome/free-solid-svg-icons';
import {AppContext} from "../../contexts/AppContext";

function FeesTable(){

  const [state, dispatch] = useContext(AppContext);

  let {students} = state;

  let currentStudents = students.filter(s => {
    return s.class !== 'Archived'
  });

  let archivedStudents = students.filter(s => {
    return s.class === 'Archived'
  })

  function currentStudentFees(students) {
   let  allFees = [];
   students.forEach(v => {
     let totalFees = v.fees.reduce((acc, item) => {
       return acc + item.amountDue
     }, 0);
     let status = 'Debt';
     if (totalFees <= 0) {
       status = 'Paid'
     }
     let f = {...v, totalAmountDue: totalFees, status};
     allFees.push(f)
   });
    return allFees
  }

  let allStudentFees = currentStudentFees(currentStudents);
  let archivedStudentFees = currentStudentFees(archivedStudents)
  function mySort(a, b) {
    if (a.class < b.class) return -1;
    else if (a.class > b.class) return 1;
    else return 0;
  }

  return(
    <div className='flex-fill' style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
      <table className='table'>
        <thead>
          <tr>
            <th>Admn No</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Due Fees</th>
            <th>Status</th>
            <th>Class</th>
            <th>Section</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
        {allStudentFees.sort(mySort).map(s => {
          return <tr>
            <td>{s.admissionNumber}</td>
            <td><img style={{width: '25px', height: '25px'}} src={'/' + s.picture} alt='student'/></td>
            <td>{s.firstName + " " + s.lastName}</td>
            <td>{s.gender}</td>
            <td>{s.totalAmountDue}</td>
            <td>{s.status}</td>
            <td>{s.class}</td>
            <td>{s.section}</td>
            <td>{s.address}</td>
          </tr>
        })}
        {archivedStudentFees.map(s => {
          return <tr>
            <td>{s.admissionNumber}</td>
            <td><img style={{width: '25px', height: '25px'}} src={'/' + s.picture} alt='student'/></td>
            <td>{s.firstName + " " + s.lastName}</td>
            <td>{s.gender}</td>
            <td>{s.totalAmountDue}</td>
            <td>{s.status}</td>
            <td>{s.class}</td>
            <td>{s.section}</td>
            <td>{s.address}</td>
          </tr>
        })}
        </tbody>
      </table>
    </div>
  );
}

function Fees(){

  return(
    <div className='d-flex flex-column flex-fill px-2 my-3 shadow' style={{backgroundColor: 'white', width: '100%', maxHeight: '300px', display: 'flex', overflowX: 'auto'}}>
      <div className='d-flex'>
        <strong className='align-self-center'>Student Fees Table</strong>
        <span className='ml-auto align-self-center flex-wrap'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} />
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}}/>
        </span>
        
      </div>
      <hr style={{margin:'0px', backgroundColor: 'black'}}/>
      <div style={{display: 'flex', overflowX: 'auto'}}>
        <FeesTable/>  
      </div>

    </div>
  );
}

export default Fees;