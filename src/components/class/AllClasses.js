import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faDumpster, faEdit, faEye, faSync, faTimes} from '@fortawesome/free-solid-svg-icons';

function AllClassesTable({classes, dispatch, onClickEdit}) {

    return (
        <div className='flex-fill'
             style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
            <table className='table table-bordered'>
                <thead>
                <tr>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Class Teacher</th>
                    <th>Class Fee</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {classes.map((c, i) => {
                    return <tr key={i}>
                        <td>{c.classId}</td>
                        <td>{c.section}</td>
                        <td>{c.teacherName}</td>
                        <td>{c.classFee}</td>
                        <td className='flex-fill' style={{minWidth: '80px'}}>
                            <FontAwesomeIcon className='mr-1' icon={faEye} style={{color: 'grey'}}/>
                            <FontAwesomeIcon className='mr-1' icon={faEdit} style={{color: 'green'}}
                                             onClick={() => onClickEdit(c)}/>
                            <FontAwesomeIcon className='mr-1' icon={faDumpster} style={{color: 'red'}}/>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

function AllClasses({classes, dispatch, onClickEdit}) {

    return (
        <div className='d-flex flex-column flex-fill px-2 my-3 shadow'
             style={{backgroundColor: 'white', width: '100%', maxHeight: '300px', display: 'flex', overflowX: 'auto'}}>
            <div className='d-flex'>
                <strong className='align-self-center'>All Classes</strong>
                {/*<div className='d-flex align-items-center mx-2 my-sm-2 m-auto'>
                    <input className='form-control form-control-sm mr-1'/>
                    <input className='form-control form-control-sm mr-1'/>
                    <button className='form-control form-control-sm'
                            style={{backgroundColor: '#264d73', color: 'white', maxWidth: '60px'}}>Search
                    </button>
                </div>*/}
                <span className='ml-auto align-self-center flex-wrap'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}}/>
          <FontAwesomeIcon icon={faSync} className='ml-2' size='sm' style={{color: 'green'}}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}}/>
        </span>

            </div>
            <hr style={{margin: '0px', backgroundColor: 'black'}}/>
            <div style={{display: 'flex', overflowX: 'auto'}}>
                <AllClassesTable classes={classes} dispatch={dispatch} onClickEdit={onClickEdit}/>
            </div>

        </div>
    );
}

export default AllClasses;