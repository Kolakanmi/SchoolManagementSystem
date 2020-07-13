import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faSync, faTimes} from '@fortawesome/free-solid-svg-icons'


function ParentExpensesTable({profile}) {

    let allExpenses = profile.details.children.reduce((acc, child) => {
        child.fees.forEach(f => {
          acc.push(f)
        });
        return acc;
    }, []);

    return (
        <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
            <table className='table table-bordered'>
                <thead>
                <tr>
                    <th>Expense Type</th>
                    <th>Amount Paid</th>
                    <th>Amount Due</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {allExpenses.map((x, i) => {
                  return <tr key={i}>
                    <td>Fees</td>
                    <td>{x.amountPaid}</td>
                    <td>{x.amountDue}</td>
                    <td>{x.status}</td>
                    <td>{new Date(x.datePaid).toDateString()}</td>
                  </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

function ParentAllExpenses({profile}) {

    return (
        <div className='d-flex flex-column flex-fill px-2 my-3 shadow'
             style={{backgroundColor: 'white', width: '100%', maxHeight: '300px', display: 'flex', overflowX: 'auto'}}>
            <div className='d-flex'>
                <strong className='align-self-center'>All Expenses</strong>
                {/*<div className='d-flex align-items-center mx-2 my-sm-2 m-auto'>
          <input className='form-control form-control-sm mr-1'/>
          <input className='form-control form-control-sm mr-1'/>
          <button className='form-control form-control-sm' style={{backgroundColor: '#264d73', color: 'white', maxWidth: '60px'}}>Search</button>
        </div>*/}
                <span className='ml-auto align-self-center flex-wrap'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}}/>
          <FontAwesomeIcon icon={faSync} className='ml-2' size='sm' style={{color: 'green'}}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}}/>
        </span>

            </div>
            <hr style={{margin: '0px', backgroundColor: 'black'}}/>
            <div style={{display: 'flex', overflowX: 'auto'}}>
                <ParentExpensesTable profile={profile}/>
            </div>

        </div>
    );
}

export default ParentAllExpenses;