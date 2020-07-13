import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faFlag, faFolder, faMoneyBillAlt} from '@fortawesome/free-solid-svg-icons'

function StudFeesExamDoc({profile}) {

    let totalDueFees = profile.details.children.reduce((acc, child) => {
        child.fees.forEach(f =>
            acc = acc + f.amountDue
        );
        return acc;
    }, 0);
    console.log(totalDueFees);
    return (
        <div className='d-flex flex-wrap'>
            <div className='d-flex flex-fill col-12 col-md-3 mr-2 p-2 mb-2' style={{
                height: '',
                color: 'white',
                background: '-webkit-linear-gradient(left,rgb(51, 204, 51),rgb(64, 191, 64))'
            }}>
                <div className='d-flex flex-column align-items-center flex-fill' style={{padding: '0px'}}>
                    <span className='d-flex justify-content-center' style={{}}><FontAwesomeIcon icon={faEdit}
                                                                                                style={{color: 'white'}}
                                                                                                size='lg'/></span>
                    <p style={{margin: '0px'}}><small>Upcoming Exam</small></p>

                </div>
                <div className='d-flex align-self-center flex-fill justify-content-center' style={{}}>
                    <strong style={{fontSize: '1.5rem'}}>0</strong>
                </div>
            </div>
            <div className='d-flex flex-fill mr-2 p-2 mb-2' style={{
                height: '',
                color: 'white',
                background: '-webkit-linear-gradient(left,rgb(255, 77, 77),rgb(255, 26, 26))'
            }}>
                <div className='d-flex flex-column align-items-center flex-fill' style={{padding: '0px'}}>
                    <span className='d-flex justify-content-center' style={{}}><FontAwesomeIcon icon={faMoneyBillAlt}
                                                                                                style={{color: 'white'}}
                                                                                                size='lg'/></span>
                    <p style={{margin: '0px'}}><small>Due Fees</small></p>

                </div>
                <div className='d-flex align-self-center flex-fill justify-content-center' style={{}}>
                    <strong style={{fontSize: '1.5rem'}}>&#8358; {totalDueFees}</strong>
                </div>
            </div>
            <div className='d-flex flex-fill mr-2 p-2 mb-2' style={{
                height: '',
                color: 'white',
                background: '-webkit-linear-gradient(left,rgb(51, 204, 255),rgb(51, 153, 255))'
            }}>
                <div className='d-flex flex-column align-items-center flex-fill' style={{padding: '0px'}}>
                    <span className='d-flex justify-content-center' style={{}}><FontAwesomeIcon icon={faFlag}
                                                                                                style={{color: 'white'}}
                                                                                                size='lg'/></span>
                    <p style={{margin: '0px'}}><small>Events</small></p>

                </div>
                <div className='d-flex align-self-center flex-fill justify-content-center' style={{}}>
                    <strong style={{fontSize: '1.5rem'}}>0</strong>
                </div>
            </div>
            <div className='d-flex flex-fill mr-2 p-2 mb-2' style={{
                height: '',
                color: 'white',
                background: '-webkit-linear-gradient(left,rgb(255, 204, 0),rgb(255, 153, 0))'
            }}>
                <div className='d-flex flex-column align-items-center flex-fill' style={{padding: '0px'}}>
                    <span className='d-flex justify-content-center' style={{}}><FontAwesomeIcon icon={faFolder}
                                                                                                style={{color: 'white'}}
                                                                                                size='lg'/></span>
                    <p style={{margin: '0px'}}><small>Documents</small></p>

                </div>
                <div className='d-flex align-self-center flex-fill justify-content-center' style={{}}>
                    <strong style={{fontSize: '1.5rem'}}>0</strong>
                </div>
            </div>
        </div>
    )
}

export default StudFeesExamDoc;