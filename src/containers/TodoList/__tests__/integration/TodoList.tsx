import React from "react";
import { mount } from "enzyme";
import { TodoList } from "@/containers/TodoList";
import { findTestWrapper } from "@/utils/testUtils";

describe("测试 TodoList", () => {
  it(`
    1. 输入框输入内容
    2. 点击回车
    3. 列表中展示用户输入的内容项
    4. 输入框内容清空
  `, () => {
    const wrapper = mount(<TodoList />);
    const inputElement = findTestWrapper(wrapper, "header-input");
    inputElement.simulate("change", {
      target: {
        value: "123"
      }
    });
    expect(inputElement.getDOMNode()).toHaveProperty("value", "123");
    inputElement.simulate("keyup", {
      keyCode: 13
    });
    expect(inputElement.getDOMNode()).toHaveProperty("value", "");
    expect(findTestWrapper(wrapper.find("UndoList"), "list-item").length).toBe(
      1
    );
  });
});
