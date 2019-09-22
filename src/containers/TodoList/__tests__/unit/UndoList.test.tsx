import React from "react";
import { shallow } from "enzyme";
import { UndoList } from "@/containers/TodoList/components/UndoList";
import { UndoList as UndoListType } from "@/containers/TodoList";
import { findTestWrapper } from "@/utils/testUtils";

describe("UndoList 组件测试", () => {
  let wrapper = shallow(
    <UndoList
      list={[]}
      onDeleteItem={() => {}}
      onChangeStatus={() => {}}
      onChangeItemValue={() => {}}
      onResetItemStatus={() => {}}
    />
  );
  beforeEach(() => {
    wrapper = shallow(
      <UndoList
        list={[]}
        onDeleteItem={() => {}}
        onChangeStatus={() => {}}
        onChangeItemValue={() => {}}
        onResetItemStatus={() => {}}
      />
    );
  });

  it("未完成列表初始化 count 数字为 0", () => {
    const countElem = findTestWrapper(wrapper, "count");
    expect(countElem.text()).toEqual("0");
    const listItemElems = findTestWrapper(wrapper, "list-item");
    expect(listItemElems.length).toEqual(0);
  });

  it("未完成列表有数据时，展示正确的 count 和渲染正确的 listItem 数量", () => {
    const testArray: UndoListType = [
      { value: "React", status: "div" },
      { status: "div", value: "Vue" },
      { status: "div", value: "Angular" }
    ];
    wrapper = shallow(
      <UndoList
        onChangeItemValue={() => {}}
        list={testArray}
        onDeleteItem={() => {}}
        onChangeStatus={() => {}}
        onResetItemStatus={() => {}}
      />
    );
    const countElem = findTestWrapper(wrapper, "count");
    expect(countElem.text()).toEqual(`${testArray.length}`);
    const listItemElems = findTestWrapper(wrapper, "list-item");
    expect(listItemElems.length).toEqual(testArray.length);
  });

  it("未完成列表可以根据 status 正确渲染", () => {
    const testArray: UndoListType = [
      { value: "React", status: "div" },
      { value: "Vue", status: "input" },
      { value: "Angular", status: "input" }
    ];
    wrapper = shallow(
      <UndoList
        onChangeItemValue={() => {}}
        list={testArray}
        onDeleteItem={() => {}}
        onChangeStatus={() => {}}
        onResetItemStatus={() => {}}
      />
    );
    const inputElems = findTestWrapper(wrapper, "edit-input");
    expect(inputElems.length).toBe(2);
    const normalTextElems = findTestWrapper(wrapper, "normal-text");
    expect(normalTextElems.length).toBe(1);
  });

  it("未完成列表有数据时，点击某个删除按钮，会调用删除方法", () => {
    const testArray: UndoListType = [
      { value: "React", status: "div" },
      { status: "div", value: "Vue" },
      { status: "div", value: "Angular" }
    ];
    const testIndex = 1;
    const testDeleteFn = jest.fn();
    wrapper = shallow(
      <UndoList
        onChangeItemValue={() => {}}
        list={testArray}
        onDeleteItem={testDeleteFn}
        onChangeStatus={() => {}}
        onResetItemStatus={() => {}}
      />
    );
    const deleteElem = findTestWrapper(wrapper, "delete-icon");
    deleteElem.at(testIndex).simulate("click", {
      currentTarget: {
        dataset: { index: testIndex }
      },
      stopPropagation: () => {}
    });
    expect(deleteElem.length).toBe(3);
    expect(testDeleteFn).toHaveBeenLastCalledWith(testIndex);
  });

  it("当某一项被点击时，触发 changeStatus 方法", () => {
    const testArray: UndoListType = [
      { value: "React", status: "div" },
      { status: "div", value: "Vue" },
      { status: "div", value: "Angular" }
    ];
    const testIndex = 1;
    const testChangeStatusFn = jest.fn();
    wrapper = shallow(
      <UndoList
        onChangeItemValue={() => {}}
        list={testArray}
        onDeleteItem={() => {}}
        onChangeStatus={testChangeStatusFn}
        onResetItemStatus={() => {}}
      />
    );
    const liElems = findTestWrapper(wrapper, "list-item");
    liElems.at(testIndex).simulate("click", {
      currentTarget: {
        dataset: { index: testIndex }
      }
    });
    expect(testChangeStatusFn).toHaveBeenLastCalledWith(testIndex);
  });

  it("当某项变成编辑状态后，input 会调用", () => {
    const testArray: UndoListType = [
      { value: "React", status: "div" },
      { status: "input", value: "Vue" },
      { status: "div", value: "Angular" }
    ];
    const testChangeValueFn = jest.fn();
    wrapper = shallow(
      <UndoList
        list={testArray}
        onDeleteItem={() => {}}
        onChangeStatus={() => {}}
        onChangeItemValue={testChangeValueFn}
        onResetItemStatus={() => {}}
      />
    );
    const inputElem = findTestWrapper(wrapper, "edit-input");
    inputElem.simulate("change", {
      target: {
        value: "123"
      },
      currentTarget: {
        dataset: { index: 1 }
      }
    });
    expect(testChangeValueFn).toHaveBeenLastCalledWith(1, "123");
  });

  it("当某项变成编辑状态后，blur 会调用", () => {
    const testArray: UndoListType = [
      { value: "React", status: "div" },
      { status: "input", value: "Vue" },
      { status: "div", value: "Angular" }
    ];
    const testBlurFn = jest.fn();
    wrapper = shallow(
      <UndoList
        list={testArray}
        onDeleteItem={() => {}}
        onChangeStatus={() => {}}
        onChangeItemValue={() => {}}
        onResetItemStatus={testBlurFn}
      />
    );
    const inputElem = findTestWrapper(wrapper, "edit-input");
    inputElem.simulate("blur", {
      currentTarget: {
        dataset: { index: 1 }
      }
    });
    expect(testBlurFn).toHaveBeenLastCalledWith(1);
  });
});
