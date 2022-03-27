import React from 'react';
import FilterItem from './FilterItem';
import './FilterGroup.css'

interface IFilterGroupProps {
    filters: string[],
    options: string[][],
    onFilterChange: CallableFunction
}
 
function FilterGroup(props: IFilterGroupProps) {
    return ( 
        <div className='filter-group'>
            {props.options.map((filter, index) => 
            <FilterItem 
              key={index}
              filterName={props.filters[index]} 
              filterOptions={filter}
              onFilterChange={props.onFilterChange}
            >
            </FilterItem>)}
        </div>
     );
}

export default FilterGroup;