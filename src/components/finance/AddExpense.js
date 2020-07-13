import React, {useContext, useState} from 'react';
import {Form, Row, FormGroup, Input, Label, Button} from "reactstrap";
import SectionHeader from '../dashboard/SectionHeader';
import {AppContext} from "../../contexts/AppContext";
import FormFeedback from "reactstrap/es/FormFeedback";
import useAxiosConfig from "../../lib/AxiosConfig";
import {Redirect} from 'react-router-dom'
import axios from "axios";

function AddExpense(props){

  const [state, dispatch] = useContext(AppContext);

  const [fieldErrors, setFieldErrors] = useState({});

  let {profile} = state;

  let initialState = {
    recipientName: '',
    amountPaid: 0,
    description: '',
    uploadDate: ''
  };

  const [addExpense, setAddExpense] = useState(initialState)

  let config = useAxiosConfig();

  function onInputChange(e) {
    const target = e.target;
    addExpense[target.name] = target.value;
    setAddExpense({...addExpense});
  }

  function handleAddExpense(event) {
    event.preventDefault();
    addExpense.amountPaid = Number(addExpense.amountPaid);
    addExpense.uploadDate = new Date().toISOString();
    let errors = validate(addExpense);
    setFieldErrors(errors);

    if (Object.keys(errors).length) return;
    setAddExpense({...addExpense});

    async function postExpense() {
      await axios.post('/v1/api/post-expense', JSON.stringify(addExpense), config)
          .then(result => {
            if (result.status === 200) {
              console.log('EXPENSE Added');
              dispatch({type: 'ADD_EXPENSE', payload: result.data})
            } if (result.status === 401) {
              return <Redirect to='/login'/>
            }
          })
          .catch(error => {
            console.log(error)
            return <Redirect to='/login'/>
          })
    }

    postExpense();

    setAddExpense({...initialState})

  }
  return(

    <div className='shadow' style={{backgroundColor: 'white'}}>
      <SectionHeader sTitle={'Add Expense'}/>
      <div>
        <Form className='mx-2 px-2' onSubmit={handleAddExpense}>
          <Row>
            <FormGroup className='flex-fill mr-3'>
              <Label>Recipient Name</Label>
              <Input invalid={fieldErrors.recipientName === true} name='recipientName' value={addExpense.recipientName} onChange={onInputChange}/>
              <FormFeedback invalid>Insert Recipient</FormFeedback>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Amount Paid</Label>
              <Input invalid={fieldErrors.recipientName === true} name='amountPaid' value={addExpense.amountPaid} onChange={onInputChange}/>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Description Of Transaction</Label>
              <Input name='description' maxLength={200} type='textarea' value={addExpense.description} onChange={onInputChange}/>
            </FormGroup>
          </Row>
          <Button style={{backgroundColor: 'teal'}} type='submit'>SAVE</Button>
        </Form>
      </div>
    </div>
  );
}

export default AddExpense;

function validate(expense) {
  let errors = {};
  if (!expense.recipientName || expense.recipientName === '') errors.recipientName = true;
  if (isNaN(expense.amountPaid)) errors.amountPaid = true;

  return errors;
}