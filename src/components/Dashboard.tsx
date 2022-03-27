import React , { Component } from 'react';
import DashboardChart from './DashboardChart';
import FilterGroup from './FilterGroup';
import SchoolsList from './SchoolsList';
import { MONTHS } from '../utils/utils';
import axios from 'axios';
import {Buffer} from 'buffer';
import './Dashboard.css';
import LessonsSummary from './LessonsSummary';

interface IDashboardState {
    data: ISchoolDetail[],
    options: any[][], 
    selectedOptions: {[key: string]: string},
    filteredData: ISchoolDetail[],
    chartData: {[key: string]: number[]},
    schoolsData: {[key: string]: number},
    schoolsDataPerMonth: {[key: string]: {[key: string]: any}},
    totalLessons: number,
    schoolToggled: string,
    showSchool: boolean,
}
interface ISchoolDetail {
    [key: string]: string | number;
    id: string;
    month: string;
    camp: string,
	country: string,
	school: string,
	lessons: number,
}
 
class Dashboard extends Component<Record<string, never>, IDashboardState> {
    constructor(props: Record<string, never>){
        super(props);
        this.state = {
            data: [],
            filteredData: [],
            options: [],
            selectedOptions: {"country": "", "camp": "", "school":""},
            chartData: {},
            schoolsData: {},
            schoolsDataPerMonth: {},
            totalLessons: 0,
            schoolToggled: "",
            showSchool: true,
        }
    }
    render() { 
        return ( 
            <div className='Dashboard'>
                <div className='dashboard-title'>
                    <h1>Analysis Chart</h1>
                    <h2>Numbers of Lessons</h2>
                </div>
                <FilterGroup filters={Object.keys(this.state.selectedOptions)} options={this.state.options} onFilterChange={this.optionsChanged}></FilterGroup>
                <div className='analysis-container'>
                    <DashboardChart data={this.state.chartData} selectedOptions={this.state.selectedOptions} toggleSchool={this.state.schoolToggled} showSchool={this.state.showSchool}></DashboardChart>
                    <div className='statistics-container'>
                        <LessonsSummary selectedCamp={this.state.selectedOptions["camp"]} totalLessons={this.state.totalLessons}></LessonsSummary>
                        <SchoolsList schoolsData={this.state.schoolsData} onSchoolToggle={this.schoolToggled}></SchoolsList>
                    </div>
                </div>
            </div>
         );
    }
    componentDidMount(){
        console.log(this.props, this.state)
        axios.get(`https://api.github.com/repos/abdelrhman-arnos/analysis-fe-challenge/contents/data.json`,{
            headers: {
              'accept': 'application/vnd.github.v3+json'
            }
          })
        .then(res => {
        const base64ToString = Buffer.from(res.data.content, "base64").toString();
        const data = JSON.parse(base64ToString);
        this.setDashboardData(data);
      })
    }
    setDashboardData(data: ISchoolDetail[]){
        this.setState({ data });
        this.setOptions();
        this.updateDashboardData();
    }
    updateDashboardData = () => {
        this.calculateFilteredData();
        this.calculateSchoolsData();
        this.calculateChartData();
        this.calculateLessonsSummary();
    }
    optionsChanged = (filter:string, newValue: string) => {
        this.updateSelectedOptions(filter, newValue);
        this.updateDashboardData();
    }
    updateSelectedOptions = (filter:string, newValue: string) => {
        const selectedOptions = {...this.state.selectedOptions, [filter]: newValue};
        this.setState({ selectedOptions });
    }
    schoolToggled = (schoolName: string, showSchool: boolean) => {
        this.setState({schoolToggled: schoolName})
        this.setState({showSchool: showSchool})
    }
    setOptions(){
        this.setState({options: Object.keys(this.state.selectedOptions).map(filter => {
            return (this.state.data.length != 0 && filter in this.state.data[0])? 
                Array.from(new Set(this.state.data.map(e => e[filter]))) : [];
        })});
        Object.keys(this.state.selectedOptions).map((filter, index) => { //Initialize the selected options with the first element
            const selectedOptions = (this.state.options[index].length != 0) ? {...this.state.selectedOptions, [filter]: this.state.options[index][0]} : {...this.state.selectedOptions, [filter]: ""}
            this.setState({ selectedOptions })
        });
        const schoolIndex = Object.keys(this.state.selectedOptions).indexOf("school");
        if(this.state.options[schoolIndex] != undefined) { //Add "Show All" option to schools filter
            const options = [...this.state.options];
            options[schoolIndex].push('Show All');
            this.setState({options});
        }
    }
    calculateFilteredData = () => {
        const filteredData = this.state.data.filter((entry) => this.filterData(entry));
        this.setState({ filteredData });
    }
    calculateSchoolsData = () => {
        const schoolsDataPerMonth = this.state.filteredData.reduce(this.calculateLessonsPerMonth, {});
        this.setState({ schoolsDataPerMonth });
        const schoolsData : {[key: string]: number} = {};
        Object.keys(schoolsDataPerMonth).map((school) => {
            schoolsData[school] = Object.values(schoolsDataPerMonth[school]).reduce((sum: number, a: number) => sum + a, 0);
        })
        this.setState({ schoolsData });
    }
    calculateChartData = () => {
        const data : {[key: string]: number[]} = {}
        Object.keys(this.state.schoolsDataPerMonth).map(school => {
            data[school] = this.normalizeSortData(this.state.schoolsDataPerMonth[school])
        });
        this.setState({chartData: data});  
    }
    calculateLessonsSummary = () => {
        const totalLessons = this.state.filteredData.reduce(this.calculateTotalLessons, 0);
        this.setState({ totalLessons });
    }
    filterData = (entry: ISchoolDetail) => {
        for(const filter in this.state.selectedOptions){
            if(filter != "school" || (filter == "school" && this.state.selectedOptions[filter] != "Show All"))
                if(entry[filter] != this.state.selectedOptions[filter]) return false
        }
        return true
    }
    normalizeSortData = (schoolData: {[key: string]: number}) => {
        const normalizedSortedData : number[] = [];
        MONTHS.map((month) => {
            if(month in schoolData) normalizedSortedData.push(schoolData[month]) 
            else normalizedSortedData.push(0);
        })
        return normalizedSortedData;
    }
    calculateLessonsPerMonth = (reducedLessons: {[key: string]: {[key: string]: any}}, current: ISchoolDetail) => {
        if(current.school in reducedLessons){
            if(current.month in reducedLessons[current.school])
                reducedLessons[current.school][current.month] += current.lessons
            else 
                reducedLessons[current.school][current.month] = current.lessons
        }
        else {
            reducedLessons[current.school] = {}
            reducedLessons[current.school][current.month] = current.lessons
        }
        return reducedLessons
    }
    calculateTotalLessons = (previousValue: number, currentValue: ISchoolDetail) => {
        return previousValue + currentValue.lessons;
    }
}
 
export default Dashboard;