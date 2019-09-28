import { ReactWrapper, ShallowWrapper, mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { ReactElement } from "react";

export const findTestWrapper = (
  wrapper: ShallowWrapper | ReactWrapper,
  tag: string
) => {
  return wrapper.find(`[data-test='${tag}']`);
};

export const actRender = async (
  renderDom: ReactElement
): Promise<ReactWrapper> => {
  let wrapper = null;
  await act(async () => {
    wrapper = mount(renderDom);
  });
  // @ts-ignore
  return wrapper;
};
