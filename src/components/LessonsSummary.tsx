import React from 'react';
import './LessonsSummary.css'
interface ILessonsSummaryProps {
    selectedCamp: string,
    totalLessons: number,
}

function LessonsSummary(props: ILessonsSummaryProps) {
    return ( 
        <div className='lessons-summary'>
            <div className='total-lessons'><div className="count">{props.totalLessons}</div><span style={{fontSize: "20px"}}>lessons</span></div>
            <div className='camp-name'>in {props.selectedCamp}</div>
        </div>
     );
}

export default LessonsSummary;