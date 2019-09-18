import React from "react";
import { TodoList, useTodoList } from "../../index";
import { act, renderHook } from "@testing-library/react-hooks";
import { shallow } from "enzyme";

describe("TodoList", () => {
  it("TodoList 初始化列表为空", () => {
    const { result } = renderHook(() => useTodoList());
    expect(result.current.undoList).toEqual([]);
  });

  it("TodoList 应该给 Header 传递一个 addUndoItem 函数", () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find("Header");
    expect(Header).toHaveProp("addUndoItem");
  });

  it("TodoList 调用 addUndoItem 的时候，undoList 会新增内容", () => {
    const { result } = renderHook(() => useTodoList());
    const value = "123";
    act(() => {
      result.current.handleAddUndoItem(value);
    });
    expect(result.current.undoList).toEqual([value]);
  });
});
