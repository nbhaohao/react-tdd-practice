import React from "react";
import { TodoList, UndoList as UndoListType, useTodoList } from "../../index";
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

  it("TodoList 应该给 UndoList 传递 list 和 onDeleteItem 和 onChangeStatus 参数", () => {
    const wrapper = shallow(<TodoList />);
    const UndoList = wrapper.find("UndoList");
    expect(UndoList).toHaveProp("list");
    expect(UndoList).toHaveProp("onDeleteItem");
    expect(UndoList).toHaveProp("onChangeStatus");
  });

  it("TodoList 调用 addUndoItem 的时候，undoList 会新增内容", () => {
    const { result } = renderHook(() => useTodoList());
    const value = "123";
    act(() => {
      result.current.handleAddUndoItem(value);
    });
    expect(result.current.undoList).toEqual([{ value, status: "div" }]);
  });
  it("TodoList 调用 handleDeleteUndoItem 的时候，undoList 会删除相应的内容", () => {
    const { result } = renderHook(() => useTodoList());
    const testArray: UndoListType = [
      { value: "React", status: "div" },
      { status: "div", value: "Vue" },
      { status: "div", value: "Angular" }
    ];
    act(() => {
      result.current.setUndoList(testArray);
    });
    act(() => {
      result.current.handleDeleteUndoItem(1);
    });
    expect(result.current.undoList).toEqual([
      { status: "div", value: "React" },
      { status: "div", value: "Angular" }
    ]);
  });
  it("TodoList 调用 handleOnChangeStatus 的时候，undoList 会改变", () => {
    const { result } = renderHook(() => useTodoList());
    const testArray: UndoListType = [
      { value: "a", status: "div" },
      { value: "b", status: "input" },
      { value: "c", status: "div" }
    ];
    act(() => {
      result.current.setUndoList(testArray);
    });
    act(() => {
      result.current.handleOnChangeStatus(1);
    });
    expect(result.current.undoList).toEqual([
      { value: "a", status: "div" },
      { value: "b", status: "input" },
      { value: "c", status: "div" }
    ]);
    act(() => {
      result.current.setUndoList([
        { value: "a", status: "div" },
        { value: "b", status: "input" },
        { value: "c", status: "input" }
      ]);
    });
    act(() => {
      result.current.handleOnChangeStatus(0);
    });
    expect(result.current.undoList).toEqual([
      { value: "a", status: "input" },
      { value: "b", status: "div" },
      { value: "c", status: "div" }
    ]);
  });
  it("TodoList 调用 handleChangeItemValue 函数的时候，undoList 会改变", () => {
    const { result } = renderHook(() => useTodoList());
    const testArray: UndoListType = [
      { value: "a", status: "div" },
      { value: "b", status: "input" },
      { value: "c", status: "div" }
    ];
    act(() => {
      result.current.setUndoList(testArray);
    });
    act(() => {
      result.current.handleChangeItemValue(1, "changeText");
    });
    expect(result.current.undoList[1].value).toBe("changeText");
  });
  it("TodoList 调用 handleResetItemStatus 函数的时候，undoList 会改变", () => {
    const { result } = renderHook(() => useTodoList());
    const testArray: UndoListType = [
      { value: "a", status: "div" },
      { value: "b", status: "input" },
      { value: "c", status: "div" }
    ];
    act(() => {
      result.current.setUndoList(testArray);
    });
    act(() => {
      result.current.handleResetItemStatus(1);
    });
    expect(result.current.undoList[1].status).toBe("div");
  });
});
