import {shallow, mount} from 'enzyme';
import SchoolSummary from '../components/SchoolSummary';

it("renders without crashing", () => {
    shallow(<SchoolSummary lessonsCount={90} schoolName={"A"} onSchoolToggle={()=>{}} fillColor={"red"}/>);
});
describe("test props", () => {
    const wrapper = mount(<SchoolSummary lessonsCount={90} schoolName={"A"} onSchoolToggle={()=>{}} fillColor={"red"} />);
    it("accepts lessonsCount prop", () => {
      expect(wrapper.props().lessonsCount).toEqual(90);
    });
    it("accepts schoolName props", () => {
        expect(wrapper.props().schoolName).toEqual("A");
    });
    it("accepts fillColor props", () => {
        expect(wrapper.props().fillColor).toEqual("red");
    });
});

describe("element render correctly", () => {
    const wrapper = mount(<SchoolSummary lessonsCount={90} schoolName={"A"} onSchoolToggle={()=>{}} fillColor={"red"} />);
    it("test checkbox state", () => {
        expect(wrapper.find("div.schools-summary-container").find("div").find("input.checkbox-round").length).toBe(1)
        expect(wrapper.find("div.schools-summary-container").find("div").find("input.checkbox-round").props().checked).toEqual(true);
    });
    it("test checkbox color", () => {
        expect(wrapper.find("div.schools-summary-container").find("div").find("input.checkbox-round").props().style?.backgroundColor).toEqual("red");
        expect(wrapper.find("div.schools-summary-container").find("div").find("input.checkbox-round").props().style?.boxShadow).toEqual("0 0 0 1px red");
    });
    it("renders lessonCount correctly", () => {
        const lessonCount = <div className="lessons-count">{90}</div>;
        expect(wrapper.find("div.schools-summary-container").find("div.schools-stats").contains(lessonCount)).toEqual(true)
    });
    it("renders schoolName correctly", () => {
        const schoolName = <div className="school-name">in {"A"}</div>;
        expect(wrapper.find("div.schools-summary-container").find("div.schools-stats").contains(schoolName)).toEqual(true)
    });
});



  