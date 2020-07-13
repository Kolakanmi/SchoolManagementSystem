import React, {useContext, useState} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {AppContext} from "../../contexts/AppContext";
import Form from "reactstrap/es/Form";
import {FormGroup, Input, Label} from "reactstrap";
import FormFeedback from "reactstrap/es/FormFeedback";
import axios from "axios";
import useAxiosConfig from "../../lib/AxiosConfig";
import Button from "reactstrap/es/Button";
import {Redirect} from 'react-router-dom'

function CreateFeesPayment(){

  const [state, dispatch] = useContext(AppContext);

  const [fieldErrors, setFieldErrors] = useState({});

  let initialState = {
    studentId: '',
    amountPaid: 0
  };

  const [addFees, setAddFees] = useState(initialState);

  let config = useAxiosConfig();

  let {students} = state;

function onInputChange(e) {
  const target = e.target;
  addFees[target.name] = target.value;
  setAddFees({...addFees});
}

function handleAddFees(event) {
  event.preventDefault();
  addFees.amountPaid = Number(addFees.amountPaid);
  let errors = validate(addFees);
  setFieldErrors(errors);

  if (Object.keys(errors).length) return;
  setAddFees({...addFees});

async function postFee() {
  await axios.post('/v1/api/post-fee', JSON.stringify(addFees), config)
      .then(result => {
        if (result.status === 200) {
          console.log('Fee Added');
          dispatch({type: 'ADD_FEE', payload: result.data})
        } if (result.status === 401) {
          return <Redirect to='/login'/>
        }
      })
      .catch(error => {
        console.log(error)
        return <Redirect to='/login'/>
      })
}

postFee();

setAddFees({...initialState})

}
  return(
    <div className='shadow' style={{backgroundColor: 'white'}}>
      <SectionHeader sTitle={'Add New Fee'}/>
      <div>
        <Form className='px-2' onSubmit={handleAddFees}>
            <FormGroup className='flex-fill mr-3'>
              <Label>Student</Label>
              <Input invalid={fieldErrors.studentId === true} type='select' name='studentId' value={addFees.studentId} onChange={onInputChange}>
                <option value=' ' > </option>
                {students.map(s => {
                  return <option key={s.admissionNumber} value={s.admissionNumber}>{s.firstName + " " + s.lastName + "( " + s.class + " )"}</option>
                })}
              </Input>
              <FormFeedback invalid>Select Student</FormFeedback>
            </FormGroup>
          <FormGroup className='flex-fill mr-3'>
            <Label>Amount Paid</Label>
            <Input invalid={fieldErrors.amountPaid === true} name='amountPaid' value={addFees.amountPaid} onChange={onInputChange}/>
            <FormFeedback invalid>Insert Amount Paid As Number</FormFeedback>
          </FormGroup>
          <Button style={{backgroundColor: 'teal'}}>ADD PAYMENT</Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateFeesPayment;

function validate(fee) {
  let errors = {};
  if (!fee.studentId || fee.studentId === '') errors.studentId = true;
  if (isNaN(fee.amountPaid)) errors.amountPaid = true;

  return errors;
}