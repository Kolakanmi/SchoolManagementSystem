import React, {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faAngleDown, faTimes, faEye, faEdit, faDumpster} from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../contexts/AppContext';
import useCollapseState from '../../lib/CollapseState';
import { Link } from 'react-router-dom/cjs/react-router-dom';


function AllBooksTable({books, dispatch, onClickEdit}){

  function deleteBook(book){
    let action = {
      type: 'DELETE_BOOK',
      payload: book
    }
    dispatch(action);
  }

  return(
    <div className='flex-fill' style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th>Subject</th>
            <th>Class</th>
            <th>Edition</th>
            <th>Published By</th>
            <th>Supplier's Name</th>
            <th>Supplier's No</th>
            <th>Price</th>
            <th>Number Ordered</th>
            <th>Upload Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.sort().map(book => {return <tr key={book.bookId}>
            <td>{book.bookTitle} </td>
            <td>{book.author}</td>
            <td>{book.subject}</td>
            <td>{book.class}</td>
            <td>{book.edition} </td>
            <td>{book.publishedBy}</td>
            <td>{book.supplierName}</td>
            <td>{book.supplierMobile}</td>
            <td>{book.price}</td>
            <td>{book.numberOfBooksOrdered}</td>
            <td>{new Date(book.uploadDate).toDateString()}</td>
            <td className='flex-fill' style={{minWidth: '80px'}}>
              <FontAwesomeIcon className='mr-1' icon={faEye} style={{color: 'grey'}}/>
              <FontAwesomeIcon className='mr-1' icon={faEdit} style={{color: 'green'}}
                                                                             onClick={() => onClickEdit(book)}/>
              <FontAwesomeIcon className='mr-1' icon={faDumpster} style={{color: 'red'}} onClick={() => deleteBook(book)}/>
            </td>
          </tr>})}
        </tbody>
      </table>
    </div>
  );
}

function AllBooks({books, dispatch, onClickEdit}){

  const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

  const collapsableStyle = {
    display: isCollapse ? 'none': 'flex'
  }

  const closeStyle = {
    display: isClosed ? 'none': 'flex'
  }

  return(
    <div className='flex-column flex-fill px-2 my-3 shadow' style={{...closeStyle, backgroundColor: 'white', width: '100%', overflowX: 'auto'}}>
      <div className='d-flex'>
        <strong className='align-self-center'>All Books</strong>
        {/*<div className='d-flex align-items-center mx-2 my-sm-2 m-auto'>
          <input className='form-control form-control-sm mr-1'/>
          <input className='form-control form-control-sm mr-1'/>
          <button className='form-control form-control-sm' style={{backgroundColor: '#264d73', color: 'white', maxWidth: '60px'}}>Search</button>
        </div>*/}
        <span className='ml-auto align-self-center flex-wrap'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} onClick = {collapseButton} />
          <FontAwesomeIcon icon={faSync} className='ml-2' size='sm' style={{color: 'green'}}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}} onClick = {closeButton}/>
        </span>
        
      </div>
      <hr style={{margin:'0px', backgroundColor: 'black'}}/>
      <div style={{...collapsableStyle, overflowX: 'auto'}}>
        <AllBooksTable books={books} dispatch={dispatch} onClickEdit={onClickEdit}/>
      </div>

    </div>
  );
}

export default AllBooks;