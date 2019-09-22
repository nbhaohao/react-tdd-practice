import { ShallowWrapper } from "enzyme";

export const findTestWrapper = (wrapper: ShallowWrapper, tag: string) => {
  return wrapper.find(`[data-test='${tag}']`);
};
