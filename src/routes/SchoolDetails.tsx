import React from 'react';
import { useLocation } from "react-router-dom";

interface LocationState {
    country: string;
    camp: string;
    school: string;
    month: string;
    lessons: number;
}

function SchoolDetails() {
    const location = useLocation();
    const state = location.state as LocationState;
    return ( 
        <div style={{marginLeft: "30px"}}>
            <h2>School Details</h2> 
            <p>Country: {(state?.country) ? state.country: ""}</p>
            <p>Camp: {(state?.camp) ? state.camp: ""}</p>
            <p>School: {(state?.school) ? state.school: ""}</p>
            <p>Month: {(state?.month) ? state.month: ""}</p>
            <p>Lessons: {(state?.lessons) ? state.lessons: ""}</p>
        </div>
    );
}

export default SchoolDetails;