import {shallow, mount} from 'enzyme';
import FilterGroup from '../components/FilterGroup';

it("renders without crashing", () => {
    shallow(<FilterGroup filters={[]} options={[[]]} onFilterChange={()=>{}}/>);
});
describe("test props", () => {
    const wrapper = mount(<FilterGroup filters={['filterA', 'filterB']} options={[['1', '2', '3'],['4', '5', '6']]} onFilterChange={()=>{}}/>);
    it("accepts filters prop", () => {
      expect(wrapper.props().filters).toEqual(['filterA', 'filterB']);
    });
    it("accepts options prop", () => {
        expect(wrapper.props().options).toEqual([['1', '2', '3'],['4', '5', '6']]);
      });
});

describe("elements render correctly", () => {
    it("test options content", () => {
        const mochedOptions : string[][] = [['1', '2', '3'],['4', '5', '6']];
        const mockedFilters = ['filterA', 'filterB'];
        let wrapper = shallow(<FilterGroup filters={mockedFilters} options={mochedOptions} onFilterChange={()=>{}}/>);
        expect(wrapper.find("div.filter-group").children().length).toEqual(2);
        (mochedOptions).map((filter, i) => {
            expect(wrapper.find("div").childAt(i).props().filterName).toEqual(mockedFilters[i]);
            expect(wrapper.find("div").childAt(i).props().filterOptions).toEqual(filter);
        })
    });
});



  