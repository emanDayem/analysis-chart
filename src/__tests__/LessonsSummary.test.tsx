import {shallow, mount} from 'enzyme';
import LessonsSummary from "../components/LessonsSummary";

it("renders without crashing", () => {
    shallow(<LessonsSummary selectedCamp={"Our Camp"} totalLessons={20}/>);
});

describe("test props and state", () => {
    it("accepts lessons prop", () => {
      const wrapper = mount(<LessonsSummary selectedCamp={"Camp A"} totalLessons={1000} />);
      expect(wrapper.props().totalLessons).toEqual(1000);
    });
    it("accept camp props", () => {
        const wrapper = mount(<LessonsSummary selectedCamp={"Camp B"} totalLessons={20} />);
        expect(wrapper.props().selectedCamp).toEqual("Camp B");
    });
});

describe("renders correctly", () => {
    it("lessons render correctly", () => {
      const wrapper = mount(<LessonsSummary selectedCamp={"Camp A"} totalLessons={1000} />);
      const lessons = <div className="count">{1000}</div>;
      expect(wrapper.contains(lessons)).toEqual(true);
    });
    it("camp name renders correctly", () => {
      const wrapper = mount(<LessonsSummary selectedCamp={"Camp B"} totalLessons={20} />);
      const camp = <div className='camp-name'>in {"Camp B"}</div>;
      expect(wrapper.contains(camp)).toEqual(true);
    });
});



  