import {ReactWrapper, ShallowWrapper} from "enzyme";

export const findTestWrapper = (wrapper: ShallowWrapper | ReactWrapper, tag: string) => {
  return wrapper.find(`[data-test='${tag}']`);
};
