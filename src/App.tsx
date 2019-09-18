import React from "react";
import { TodoList } from "./containers/TodoList";

const App: React.FC = () => {
  return (
    <div className="app-container" data-test="app-container">
      <TodoList />
    </div>
  );
};

export default App;
