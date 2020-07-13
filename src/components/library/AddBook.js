import React, {useContext, useState} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {AppContext} from '../../contexts/AppContext';
import useCollapseState from '../../lib/CollapseState';
import {Form, FormGroup, Input, Label, Row} from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import axios from "axios";
import AllBooks from "./AllBooks";
import {returnClassesArray, returnSubjectsArray} from "../../lib/ReturnNeededArray";
import FormFeedback from "reactstrap/es/FormFeedback";
import useAxiosConfig from "../../lib/AxiosConfig";
import {Redirect} from 'react-router-dom'


function AddBook(props) {

    const [state, dispatch] = useContext(AppContext);

    const initialBook = {
        bookTitle: '',
        subject: '',
        edition: '',
        author: '',
        class: '',
        publishedBy: '',
        publishYear: '',
        supplierName: '',
        supplierMobile: '',
        uploadDate: '',
        bookId: '',
        price: 0,
        numberOfBooksOrdered: 0,
        totalAmount: 0
    };


    const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

    let {books, classes, subjects, profile} = state;

    const [editableBookId, setEditableBookId] = useState(false);

    const [newBook, setNewBook] = useState(initialBook);

    const [fieldErrors, setFieldErrors] = useState({});

    let config = useAxiosConfig();


    function onClickEdit(x) {
        setEditableBookId(true);
        setNewBook({...x});
    }
    
    async function deleteBook(bookId) {
        await axios.delete('/v1/api/delete-book/' + bookId, config)
            .then(result => {
                if (result.status === 200) {
                    let action = {type: 'DELETE_BOOK', payload: bookId};
                    dispatch(action);
                }
            })
    }


    const collapsableStyle = {
        display: isCollapse ? 'none' : 'block'
    };

    const closeStyle = {
        display: isClosed ? 'none' : 'block'
    };

    function onInputChange(e) {
        const target = e.target;
        newBook[target.name] = target.value;
        setNewBook({...newBook});
    }

    function handleAddBook(event) {
        event.preventDefault();
        //console.log(fileInput.current.files[0].name);

        const date = new Date();
        if (editableBookId) {
            console.log(newBook.uploadDate)
        } else newBook.uploadDate = date.toISOString();
        newBook.price = Number(newBook.price)
        newBook.numberOfBooksOrdered = Number(newBook.numberOfBooksOrdered)
        newBook.publishYear = Number(newBook.publishYear);
        newBook.bookId = newBook.subject + newBook.class + newBook.uploadDate;
        newBook.totalAmount = newBook.price * newBook.numberOfBooksOrdered;
        let errors = validate(newBook);
        setFieldErrors(errors);
        if(Object.keys(errors).length) return;
        console.log(newBook);
        setNewBook({...newBook});

        async function postBook() {
            let action;
            if (editableBookId) {
                await axios.put('/v1/api/update-book', JSON.stringify(newBook), config)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'EDIT_BOOK', payload: result.data};
                            console.log('EditBook');
                            dispatch(action);
                        } if (result.status === 401) {
                            return <Redirect to='/login'/>
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        return <Redirect to='/login'/>
                    })
            } else {
                await axios.post('/v1/api/post-book', JSON.stringify(newBook), config)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'ADD_BOOK', payload: result.data};
                            console.log('AddBook');
                            dispatch(action);
                        } if (result.status === 401) {
                            return <Redirect to='/login'/>
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        return <Redirect to='/login'/>
                    })
            }
        }

        postBook();

        setNewBook({...initialBook});
    }

    return (
        <div className='d-flex flex-wrap'>
            {(profile.role === 'Admin' || 'admin') ? <div className='shadow mr-2 mb-4' style={{...closeStyle, backgroundColor: 'white'}}>
                <SectionHeader sTitle={'Add New Book'} toggleCollapse={collapseButton} toggleClose={closeButton}/>
                <div className='px-3' style={collapsableStyle}>
                    <Form className='px-2' onSubmit={handleAddBook}>
                        <Row className='d-flex flex-wrap'>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Book Title</Label>
                                <Input invalid={fieldErrors.title === true} name='title' value={newBook.title} onChange={onInputChange}/>
                                <FormFeedback invalid>Insert Title</FormFeedback>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Subject</Label>
                                <Input type='select' name='subject' value={newBook.subject} onChange={onInputChange}>
                                    <option value=' '> </option>
                                    {returnSubjectsArray(subjects).map((v,i) => {
                                        return <option key={i} value={v}>{v}</option>
                                    })}
                                </Input>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Edition</Label>
                                <Input name='edition' value={newBook.edition} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Author</Label>
                                <Input name='author' value={newBook.author} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Class</Label>
                                <Input type='select' name='class' value={newBook.class} onChange={onInputChange}>
                                    <option value=' '> </option>
                                    {returnClassesArray(classes).map((v,i) => {
                                        return <option key={i} value={v}>{v}</option>
                                    })}
                                </Input>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Price</Label>
                                <Input invalid={fieldErrors.price === true} name='price' value={newBook.price} onChange={onInputChange}/>
                                <FormFeedback invalid>Insert Price As A Number</FormFeedback>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Published By</Label>
                                <Input name='publishedBy' value={newBook.publishedBy} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Publish Year</Label>
                                <Input invalid={fieldErrors.publishYear === true} name='publishYear' value={newBook.publishYear} onChange={onInputChange}/>
                                <FormFeedback invalid>Insert Year As A Number</FormFeedback>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Supplier's Name</Label>
                                <Input name='supplierName' value={newBook.supplierName} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Supplier's Number</Label>
                                <Input invalid={fieldErrors.supplierMobile === true} name='supplierMobile' value={newBook.supplierMobile} onChange={onInputChange}/>
                           <FormFeedback invalid>Insert Supplier Number</FormFeedback>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Number Of Books Ordered</Label>
                                <Input invalid={fieldErrors.numberOfBooksOrdered === true} name='numberOfBooksOrdered' value={newBook.numberOfBooksOrdered} onChange={onInputChange}/>
                                <FormFeedback invalid>Insert Number Of Books</FormFeedback>
                            </FormGroup>
                        </Row>
                        <Button style={{backgroundColor: 'teal'}} type='submit'>Save</Button>
                    </Form>
                </div>
            </div> : <div></div>}
          <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
            <AllBooks books={books} dispatch={dispatch} onClickEdit={onClickEdit} deleteBook={deleteBook}/>
          </div>
        </div>

    );
}

export default AddBook;


function validate(book) {
    let errors = {};
    if (!book.title || book.title === '') errors.title = true;
    if (isNaN(book.price)) errors.price = true;
    if (isNaN(book.publishYear)) errors.publishYear = true;
    if (!book.supplierMobile || book.supplierMobile === '') errors.supplierMobile = true;
   // if (isNaN(book.numberOfBooksOrdered)) errors.numberOfBooksOrdered = true;

    return errors;
}