import React from "react";
import { shallow } from "enzyme";
import { UndoList } from "@/containers/TodoList/components/UndoList";
import { findTestWrapper } from "@/utils/testUtils";

describe("UndoList 组件测试", () => {
  let wrapper = shallow(<UndoList list={[]} onDeleteItem={() => {}} />);
  beforeEach(() => {
    wrapper = shallow(<UndoList list={[]} onDeleteItem={() => {}} />);
  });

  it("未完成列表初始化 count 数字为 0", () => {
    const countElem = findTestWrapper(wrapper, "count");
    expect(countElem.text()).toEqual("0");
    const listItemElems = findTestWrapper(wrapper, "list-item");
    expect(listItemElems.length).toEqual(0);
  });

  it("未完成列表有数据时，展示正确的 count 和渲染正确的 listItem 数量", () => {
    const testArray = ["React", "Vue", "Angular"];
    wrapper = shallow(<UndoList list={testArray} onDeleteItem={() => {}} />);
    const countElem = findTestWrapper(wrapper, "count");
    expect(countElem.text()).toEqual(`${testArray.length}`);
    const listItemElems = findTestWrapper(wrapper, "list-item");
    expect(listItemElems.length).toEqual(testArray.length);
  });

  it("未完成列表有数据时，点击某个删除按钮，会调用删除方法", () => {
    const testArray = ["React", "Vue", "Angular"];
    const testIndex = 1;
    const testDeleteFn = jest.fn();
    wrapper = shallow(
      <UndoList list={testArray} onDeleteItem={testDeleteFn} />
    );
    const deleteElem = findTestWrapper(wrapper, "delete-icon");
    deleteElem.at(testIndex).simulate("click", {
      currentTarget: {
        dataset: { index: testIndex }
      }
    });
    expect(deleteElem.length).toBe(3);
    expect(testDeleteFn).toHaveBeenLastCalledWith(testIndex);
  });
});
