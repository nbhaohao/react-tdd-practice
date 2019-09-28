const mockUndoListResponse = {
  data: [{ status: "div", value: "123" }],
  success: true
};

export default {
  get(url: string) {
    if (url === "/undoList.json") {
      return new Promise((resolve, reject) => {
        resolve(mockUndoListResponse);
      });
    }
  }
};
