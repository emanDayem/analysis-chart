import {shallow, mount} from 'enzyme';
import SchoolsList from '../components/SchoolsList';
import { NAMED_COLORS } from '../utils/utils';

it("renders without crashing", () => {
    shallow(<SchoolsList schoolsData={{"schoolA": 10}} onSchoolToggle={()=>{}}/>);
});
describe("test props", () => {
    const wrapper = mount(<SchoolsList schoolsData={{"schoolA": 10}} onSchoolToggle={()=>{}}/>);
    it("accepts filterName prop", () => {
      expect(wrapper.props().schoolsData).toEqual({"schoolA": 10});
    });
});

describe("elements render correctly", () => {
    it("test empty schoolsList", () => {
        let wrapper = mount(<SchoolsList schoolsData={{}} onSchoolToggle={()=>{}}/>);
        expect(wrapper.find("div").children().length).toEqual(0)
    });
    it("test schoolsList lengths", () => {
        let wrapper = shallow(<SchoolsList schoolsData={{"schoolA": 10}} onSchoolToggle={()=>{}}/>);
        expect(wrapper.find("div").children().length).toEqual(1);

        wrapper = shallow(<SchoolsList schoolsData={{"schoolA": 10, "schoolB": 10}} onSchoolToggle={()=>{}}/>);
        expect(wrapper.find("div").children().length).toEqual(2);
    });
    it("test school element content", () => {
        const mochedSchoolList : {[key: string]: number} = {"schoolA": 10, "schoolB": 20, "schoolC": 30, "schoolD": 40, "schoolE": 50, "schoolF": 60, "schoolG": 70}
        let wrapper = shallow(<SchoolsList schoolsData={mochedSchoolList} onSchoolToggle={()=>{}}/>);
        expect(wrapper.find("div").children().length).toEqual(7);
        Object.keys(mochedSchoolList).map((school, i) => {
            expect(wrapper.find("div").childAt(i).props().lessonsCount).toEqual(mochedSchoolList[school]);
            expect(wrapper.find("div").childAt(i).props().schoolName).toEqual(school);
            expect(wrapper.find("div").childAt(i).props().fillColor).toEqual(NAMED_COLORS[i]);
        })
    });
});



  