import React, {useContext} from 'react'
import {AppContext} from "../../contexts/AppContext";
import ParentsDashboard from "./ParentsDashboard";

function TeacherDashboard() {

    return(
        <div>
            <ParentsDashboard/>
        </div>
    )
}

export default TeacherDashboard