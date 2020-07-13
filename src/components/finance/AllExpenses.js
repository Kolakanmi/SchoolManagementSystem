import React, {useContext, useState} from 'react';
import {AppContext} from "../../contexts/AppContext";

function AllExpensesTable(){

  const [state, dispatch] = useContext(AppContext);
  let {expenses} = state

  function mySort(a, b) {
    if (a.uploadDate > b.uploadDate) return -1;
    else if (a.uploadDate < b.uploadDate) return 1;
    else return 0;

  }

  return(
    <div className='flex-fill' style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
      <table className='table'>
        <thead>
          <tr>
            <th>Recipient Name</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Session</th>
            <th>Term</th>
            <th>Date Paid</th>
          </tr>
        </thead>
        <tbody>
        {expenses.sort(mySort).map((e, i) => {
          return <tr key={i}>
            <td>{e.recipient}</td>
            <td>{e.amountPaid}</td>
            <td>{e.description}</td>
            <td>{e.session}</td>
            <td>{e.termId}</td>
            <td>{e.uploadDate}</td>
          </tr>
        })}
        </tbody>
      </table>
    </div>
  );
}

function AllExpenses(){

  return(
    <div className='d-flex flex-column flex-fill px-2 my-3 shadow' style={{backgroundColor: 'white', width: '100%', maxHeight: '300px', display: 'flex', overflowX: 'auto'}}>
      <div className='d-flex'>
        <strong className='align-self-center'>All Expenses List</strong>
        
      </div>
      <hr style={{margin:'0px', backgroundColor: 'black'}}/>
      <div style={{display: 'flex', overflowX: 'auto'}}>
        <AllExpensesTable/>  
      </div>

    </div>
  );
}

export default AllExpenses;