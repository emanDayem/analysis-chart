import React from 'react';
import { NAMED_COLORS } from '../utils/utils';
import SchoolSummary from './SchoolSummary';

interface ISchoolsListProps {
    schoolsData: {[key: string]: number},
    onSchoolToggle: any,
}

function SchoolsList(props: ISchoolsListProps) {
    return ( 
        <div>
            {Object.keys(props.schoolsData).map((schoolName, index) => {
                return <SchoolSummary
                    key={index}
                    lessonsCount={props.schoolsData[schoolName]}
                    schoolName={schoolName}
                    fillColor={NAMED_COLORS[index]}
                    onSchoolToggle={props.onSchoolToggle}
                />
            })}
        </div>
     );
}

export default SchoolsList;