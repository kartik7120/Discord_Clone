import './App.css';
import socket from './globalImports';
import SideBar from "./components/SideBar";
import { Outlet } from 'react-router-dom';
import React from 'react';
function App() {
  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the main namespace");
      console.log(socket.id);
    })
  }, [])
  return (
    <>
      <div className="App">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
