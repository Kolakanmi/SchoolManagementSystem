import React, {useState, useContext} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {AppContext} from '../../contexts/AppContext';
import useCollapseState from '../../lib/CollapseState';
import {Redirect} from 'react-router-dom';
import {Col, Row, FormGroup, Form, Label, Input} from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import axios from "axios";
import AllBooks from "./AllBooks";
import {returnClassesArray, returnSubjectsArray} from "../../lib/ReturnNeededArray";


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
    }


    const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

    let {books, classes, subjects, profile} = state;

    const [editableBookId, setEditableBookId] = useState(false);

    const [newBook, setNewBook] = useState(initialBook);


    function onClickEdit(x) {
        setEditableBookId(true);
        setNewBook({...x});
    }


    const collapsableStyle = {
        display: isCollapse ? 'none' : 'block'
    }

    const closeStyle = {
        display: isClosed ? 'none' : 'block'
    }

    function onInputChange(e) {
        const target = e.target;
        newBook[target.name] = target.value;
        setNewBook({...newBook});
    }

    function handleAddBook(event) {
        event.preventDefault();
        //console.log(fileInput.current.files[0].name);

        const date = new Date();
        if (editableBookId === false) {
            newBook.uploadDate = date.toISOString();
        }
        newBook.publishYear = Number(newBook.publishYear);
        newBook.bookId = newBook.subject + newBook.class + newBook.uploadDate;
        newBook.totalAmount = newBook.price * newBook.numberOfBooksOrdered;
        console.log(newBook);
        setNewBook({...newBook});

        async function postBook() {
            let action;
            if (editableBookId) {
                await axios.put('http://localhost:8080/v1/api/update-book', newBook)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'EDIT_BOOK', payload: result.data};
                            console.log('EditBook')
                            dispatch(action);
                        }
                    })
            } else {
                await axios.post('http://localhost:8080/v1/api/post-book', JSON.stringify(newBook))
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'ADD_BOOK', payload: result.data};
                            console.log('AddBook')
                            dispatch(action);
                        }
                    })
            }
        }

        postBook()

        setNewBook({...initialBook});
    }

    return (
        <div className='d-flex flex-wrap'>
            {(profile.role === 'admin') ? <div className='shadow mr-2 mb-4' style={{...closeStyle, backgroundColor: 'white'}}>
                <SectionHeader sTitle={'Add New Book'} toggleCollapse={collapseButton} toggleClose={closeButton}/>
                <div className='px-3' style={collapsableStyle}>
                    <Form className='px-2' onSubmit={handleAddBook}>
                        <Row className='d-flex flex-wrap'>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Book Title</Label>
                                <Input name='title' value={newBook.title} onChange={onInputChange}/>
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
                                <Input name='price' value={newBook.price} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Published By</Label>
                                <Input name='publishedBy' value={newBook.publishedBy} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Publish Year</Label>
                                <Input name='publishYear' value={newBook.publishYear} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Supplier's Name</Label>
                                <Input name='supplierName' value={newBook.supplierName} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Supplier's Number</Label>
                                <Input name='supplierMobile' value={newBook.supplierMobile} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Number Of Books Ordered</Label>
                                <Input name='numberOfBooksOrdered' value={newBook.numberOfBooksOrdered} onChange={onInputChange}/>
                            </FormGroup>
                        </Row>
                        <Button type='submit'>Save</Button>
                    </Form>
                </div>
            </div> : <div></div>}
          <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
            <AllBooks books={books} dispatch={dispatch} onClickEdit={onClickEdit}/>
          </div>
        </div>

    );
}

export default AddBook;