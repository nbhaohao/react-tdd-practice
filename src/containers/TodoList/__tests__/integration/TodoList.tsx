import React from "react";
import { Provider } from "react-redux";
import { TodoList } from "@/containers/TodoList";
import { findTestWrapper, actRender } from "@/utils/testUtils";
import { store } from "@/store/store";
import { mockUndoListResponse } from "@/containers/TodoList/__mocks__/axios";

describe("测试 TodoList", () => {
  it(`
    1. 输入框输入内容
    2. 点击回车
    3. 列表中展示用户输入的内容项
    4. 输入框内容清空
  `, async () => {
    const wrapper = await actRender(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    wrapper.update();
    const initLength = findTestWrapper(wrapper.find("UndoList"), "list-item")
      .length;
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
      initLength + 1
    );
  });
  it(`
    1. 用户打开页面
    2. 应该展示接口返回的数据
  `, async () => {
    const wrapper = await actRender(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    wrapper.update();
    expect(findTestWrapper(wrapper.find("UndoList"), "list-item").length).toBe(
      1
    );
  });

  it(`
  1. 用户打开页面，请求不正常
  2. 页面无列表内容，但能把页面展示出来
  `, async () => {
    mockUndoListResponse.success = false;
    const wrapper = await actRender(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    wrapper.update();
    expect(findTestWrapper(wrapper.find("UndoList"), "list-item").length).toBe(
      0
    );
    mockUndoListResponse.success = true;
  });
});
