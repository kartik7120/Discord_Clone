import './App.css';
import SideBar from "./components/SideBar";
import { Outlet } from 'react-router-dom';
function App() {
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
