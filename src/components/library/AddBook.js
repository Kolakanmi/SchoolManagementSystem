import React from 'react';
import SectionHeader from '../dashboard/SectionHeader';

function AddBook(props){

  return(
    <div className='shadow' style={{backgroundColor: 'white'}}>
      <SectionHeader sTitle={'Add New Book'}/>
      <div>
        <form className='mx-2'>
          <h3>Book Information</h3>
          <div className='d-flex flex-wrap my-3'>
            <div className='d-flex flex-column flex-fill mr-3'>
              <label for='booktitle'>Book Title</label>
              <input name='booktitle' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3'>
              <label for='subject'>Subject</label>
              <input name='subject' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='edition'>Edition</label>
              <input name='edition'/>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='author'>Author</label>
              <input name='author'/>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='class'>Class</label>
              <input name='class'/>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='publishedby'>Published By</label>
              <input name='publishedby'/>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='publishyear'>Publishing Year</label>
              <input name='publishyear'/>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='booksupplier'>Supplier's Name</label>
              <input name='booksupplier' type='email' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='suppliernumber'>Supplier's Number</label>
              <input name='suppliernumber' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='birth'>Upload Date</label>
              <input name='birth' type='date' />
            </div>
            <div className='d-flex flex-column mr-3 mb-3'>
              <label for='bookid'>ID</label>
              <input name='bookid'/>
            </div>
        
          </div>

          
          <div>
            <button>Save</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddBook;