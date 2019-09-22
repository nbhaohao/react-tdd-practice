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

  it("TodoList 应该给 UndoList 传递 list 和 onDeleteItem 参数", () => {
    const wrapper = shallow(<TodoList />);
    const UndoList = wrapper.find("UndoList");
    expect(UndoList).toHaveProp("list");
    expect(UndoList).toHaveProp("onDeleteItem");
  });

  it("TodoList 调用 addUndoItem 的时候，undoList 会新增内容", () => {
    const { result } = renderHook(() => useTodoList());
    const value = "123";
    act(() => {
      result.current.handleAddUndoItem(value);
    });
    expect(result.current.undoList).toEqual([value]);
  });
  it("TodoList 调用 handleDeleteUndoItem 的时候，undoList 会删除相应的内容", () => {
    const { result } = renderHook(() => useTodoList());
    const testArray = ["Vue", "React", "Angular"];
    act(() => {
      result.current.setUndoList(testArray);
    });
    act(() => {
      result.current.handleDeleteUndoItem(1);
    });
    expect(result.current.undoList).toEqual(["Vue", "Angular"]);
  });
});
