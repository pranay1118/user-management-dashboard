import React from "react";
import Header from "./components/Header";
import UserTabs from "./components/UserTabs";
import './App.css';
const App = () => {
  return (
    <>
      <Header />
      <div className="content">
        <div className="sub_content">
          <UserTabs></UserTabs>
        </div>
      </div>
    </>
  );
};

export default App;
