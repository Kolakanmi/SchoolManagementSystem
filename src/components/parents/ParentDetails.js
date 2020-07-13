import React, {useContext} from 'react';
import {AppContext} from "../../contexts/AppContext";
import SectionHeader from "../dashboard/SectionHeader";

function ParentDetails(props) {
    const [state] = useContext(AppContext);

    const parentId = props.match.params.id;

    const parent = state.parents.find(par => par.parentId === parentId);

    return(
        <div className='shadow' style={{backgroundColor: 'white'}}>
            <SectionHeader sTitle={'About ' + parent.firstName + " " + parent.lastName}/>
            <div className='d-flex flex-wrap px-2'>
                <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
                    <div className='my-sm-2' style={{padding: '0px', fontSize: '0.8rem', wordWrap: 'break-word'}}>
                        <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Name:</p> <p className='col-8 p-0 px-sm-2'><strong>{parent.firstName + ' ' + parent.lastName}</strong></p></div>
                        <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Gender:</p> <p className='col-8 p-0 px-sm-2'><strong>{parent.gender}</strong></p></div>
                        <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Religion:</p> <p className='col-8 p-0 px-sm-2'><strong>{parent.religion}</strong></p></div>
                        <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>E-mail:</p> <p className='col-8 p-0 px-sm-2'><strong>{parent.email}</strong></p></div>
                        <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Occupation:</p> <p className='col-8 p-0 px-sm-2'><strong>{parent.occupation}</strong></p></div>
                        <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Home Address:</p> <p className='col-8 p-0 px-sm-2'><strong>{parent.address}</strong></p></div>
                        <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Mobile Number No:</p> <p className='col-8 p-0 px-sm-2'><strong>{parent.mobileNumber}</strong></p></div>
                    </div>
                </div>
                <div>
                    {parent.children.map((x, i) => {
                        return <SingleChild key={i} child={x} index={i}/>
                    })}
                </div>
            </div>

        </div>
    );
}

function SingleChild({child, index}) {

    let totalFees = child.fees.reduce((acc, item) => {
        return acc + item.amountDue
    }, 0);


    return(
        <div className='flex-fill px-2 my-3 shadow' style={{backgroundColor: 'white', width: '100%'}}>
            <div className='d-flex'>
                <strong> Child_0{"" + index}</strong>
            </div>
            <hr style={{margin:'0px', backgroundColor: 'black'}}/>
            <div className='d-flex flex-wrap flex-fill'>
                <div className='my-sm-2' style={{padding: '0px'}}>
                    <img style={{width: '100px', height: '100px'}} src={'/' + child.picture} alt='student'/>

                </div>
                <div className='my-sm-2 flex-fill' style={{padding: '0px', fontSize: '0.8rem', wordWrap: 'break-word'}}>
                    <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Name:</p> <p className='col-8 pl-2 px-sm-2'><strong>{child.firstName}</strong></p></div>
                    <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Admission Number:</p> <p className='col-8 pl-2 px-sm-2'><strong>{child.admissionNumber}</strong></p></div>
                    <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Gender:</p> <p className='col-8 pl-2 px-sm-2'><strong>{child.gender}</strong></p></div>
                    <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Class:</p> <p className='col-8 pl-2 px-sm-2'><strong>{child.class}</strong></p></div>
                    <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Section:</p> <p className='col-8 pl-2 px-sm-2'><strong>{child.section}</strong></p></div>
                    <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Admission Date:</p> <p className='col-8 pl-2 px-sm-2'><strong>{new Date(child.dateOfBirth).toDateString()}</strong></p></div>
                    <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Due Fees:</p> <p className='col-8 pl-2 px-sm-2'><strong>{totalFees}</strong>
                    </p></div>
                </div>
            </div>

        </div>
    );
}

export default ParentDetails;