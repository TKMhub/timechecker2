import React from "react";
import "./App.css";
import WorkTimeChecker from "./mobile/WorkTimeChecker"; // WorkTimeChecker コンポーネントをインポート

function App() {
  return (
    <div className="App">
      {/* WorkTimeChecker コンポーネントをレンダリング */}
      <WorkTimeChecker />
    </div>
  );
}

export default App;
