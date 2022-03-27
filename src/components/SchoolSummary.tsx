import React from 'react';
import { useState } from 'react';
import './SchoolSummary.css';

interface ISchoolDetailProps {
    lessonsCount: number,
    schoolName: string,
    onSchoolToggle: any,
    fillColor: string
}

 
function SchoolSummary(props: ISchoolDetailProps) {
    const [checked, setChecked] = useState(true);
    const [color] = useState(props.fillColor)
    const [checkboxShadowBox] = useState("0 0 0 1px " + props.fillColor);
    const [checkboxColor, setCheckBoxColor] = useState(props.fillColor)

    return ( 
        <div className='schools-summary-container'>
            <div><input type="checkbox" className="checkbox-round" style={{boxShadow: checkboxShadowBox, backgroundColor: checkboxColor}} onChange={(e) => schoolToggled(e)} checked={checked}/></div>
            <div className='schools-stats' style={{color: color}}>
                <div className="lessons-count">{props.lessonsCount}</div><span style={{fontSize: "20px", fontWeight:"400"}}>lessons</span>
                <div className="school-name">in {props.schoolName}</div>
            </div>
        </div>
     );
    
     function schoolToggled(e: any){
        setChecked(!checked);
        (e.target.checked) ? setCheckBoxColor(props.fillColor) : setCheckBoxColor("white");
        props.onSchoolToggle(props.schoolName, e.target.checked);
    }
}

export default SchoolSummary;