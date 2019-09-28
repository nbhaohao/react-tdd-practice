import React from "react";
import { Provider } from "react-redux";
import { TodoList } from "./containers/TodoList";
import { store } from "@/store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app-container" data-test="app-container">
        <TodoList />
      </div>
    </Provider>
  );
};

export { App };
