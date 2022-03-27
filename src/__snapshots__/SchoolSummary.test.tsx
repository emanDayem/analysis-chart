import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import SchoolSummary from '../components/SchoolSummary'

it("Test changes when school toggled", () => {
    const tree = shallow(<SchoolSummary lessonsCount={90} schoolName={"A"} onSchoolToggle={()=>{}} fillColor={"red"} />);
    expect(toJson(tree)).toMatchSnapshot();

    tree.find("div.schools-summary-container").find("div").find("input.checkbox-round").invoke('onChange');
    expect(toJson(tree)).toMatchSnapshot();
  });
  