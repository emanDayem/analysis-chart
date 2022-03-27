import {shallow, mount} from 'enzyme';
import FilterItem from '../components/FilterItem';

it("renders without crashing", () => {
    shallow(<FilterItem filterName={"class"} filterOptions={["A", "B", "C"]} onFilterChange={()=>{}}/>);
});
describe("test props", () => {
    const wrapper = mount(<FilterItem filterName={"class"} filterOptions={["A", "B", "C"]} onFilterChange={()=>{}}/>);
    it("accepts filterName prop", () => {
      expect(wrapper.props().filterName).toEqual("class");
    });
    it("accepts filterOptions props", () => {
        expect(wrapper.props().filterOptions).toEqual(["A", "B", "C"]);
    });
});

describe("elements render correctly", () => {
    let wrapper = mount(<FilterItem filterName={"class"} filterOptions={["A", "B", "C"]} onFilterChange={()=>{}}/>);
    it("filterName renders correctly", () => {
        const filterElement = <div>Select {"class"}</div>;
        expect(wrapper.find("div.filter-item").contains(filterElement)).toEqual(true)

    });
    it("options render item correctly", () => {
        expect(wrapper.find("div.filter-item").find("div.options-list").children().length).toEqual(1);
        expect(wrapper.find("div.filter-item").find("div.options-list").childAt(0).props().items).toEqual(["A", "B", "C"]);
    });
    it("test options props", () => {
        expect(wrapper.find("div.filter-item").find("div.options-list").childAt(0).props().searchEnabled).toEqual(true);
        expect(wrapper.find("div.filter-item").find("div.options-list").childAt(0).props().searchMode).toEqual("contains");
        expect(wrapper.find("div.filter-item").find("div.options-list").childAt(0).props().defaultValue).toEqual("A");
    });
    it("test options default value", () => {
        wrapper = mount(<FilterItem filterName={"class"} filterOptions={[]} onFilterChange={()=>{}}/>);
        expect(wrapper.find("div.filter-item").find("div.options-list").childAt(0).props().defaultValue).toEqual("");
    });
});



  