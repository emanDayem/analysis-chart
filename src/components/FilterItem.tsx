import React from 'react';
import { Component } from 'react';
import SelectBox from 'devextreme-react/select-box';
import './FilterItem.css'


interface IFilterItemProps {
    filterName: string
    filterOptions: string[]
    onFilterChange: any
}
 
interface IFilterItemState {
    searchModeOption: any;
}
 
class FilterItem extends Component<IFilterItemProps, IFilterItemState> {
    constructor(props: IFilterItemProps){
        super(props);

        this.state = {
            searchModeOption: 'contains'
        }
    }
    render() { 
        return ( 
            <div className='filter-item'>
                <div>Select {this.props.filterName}</div> 
                <div className='options-list'>
                    <SelectBox 
                    items={this.props.filterOptions} 
                    defaultValue={this.props.filterOptions.length != 0 ? this.props.filterOptions[0]: ""}
                    searchEnabled={true}
                    searchMode={this.state.searchModeOption}
                    onValueChanged={(e) => this.props.onFilterChange(this.props.filterName, e.value)}
                /></div>
            </div>
        );
    }
}
 
export default FilterItem;