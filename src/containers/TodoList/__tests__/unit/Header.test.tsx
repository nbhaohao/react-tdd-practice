import React from "react";
import { shallow } from "enzyme";
import { Header } from "../../components/Header";

describe("Header 组件", () => {
  let wrapper = shallow(<Header addUndoItem={() => {}} />);
  afterEach(() => {
    wrapper = shallow(<Header addUndoItem={() => {}} />);
  });

  it("应该有个 input", () => {
    expect(wrapper.exists("[data-test='input']")).toBe(true);
  });

  it("input 框内容，初始化应该为空", () => {
    const inputElement = wrapper.find("[data-test='input']");
    expect(inputElement).toHaveProp("value", "");
  });

  it("input 框内容，当用户输入时，会跟着变化", () => {
    const testValue = "123";
    wrapper.find("[data-test='input']").simulate("change", {
      target: {
        value: testValue
      }
    });
    expect(wrapper.find("[data-test='input']")).toHaveProp("value", testValue);
  });

  it("input 框输入回车时，如果 input 框无内容，无操作", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    wrapper.find("[data-test='input']").simulate("change", {
      target: {
        value: ""
      }
    });
    wrapper.find("[data-test='input']").simulate("keyup", {
      keyCode: 13
    });
    expect(fn).not.toBeCalled();
  });

  it("input 框输入回车时，如果 input 框有内容，则调用 addUndoItem 方法，且清空 inputValue", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    const testValue = "123";
    wrapper.find("[data-test='input']").simulate("change", {
      target: {
        value: testValue
      }
    });
    wrapper.find("[data-test='input']").simulate("keyup", {
      keyCode: 13
    });
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(testValue);
    expect(wrapper.find("[data-test='input']")).toHaveProp("value", "");
  });

  it("input 框输入除了回车的键时，无论 input 是否有值，addUndoItem 方法都不应该被调用", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    wrapper.find("[data-test='input']").simulate("change", {
      target: {
        value: ""
      }
    });
    wrapper.find("[data-test='input']").simulate("keyup", {
      keyCode: 12
    });
    expect(fn).not.toBeCalled();
    wrapper.find("[data-test='input']").simulate("change", {
      target: {
        value: "123"
      }
    });
    wrapper.find("[data-test='input']").simulate("keyup", {
      keyCode: 16
    });
    expect(fn).not.toBeCalled();
  });

  it("Header 样式组件测试", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
