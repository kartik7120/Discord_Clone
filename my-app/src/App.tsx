import './App.css';
import LoadingScreen from './components/LoadingScreen';
import SideBar from "./components/SideBar";
import { Outlet } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
function App() {
  return (
    <>
      <div id="portalDiv"></div>
      <div className="App">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}

export default withAuthenticationRequired(App, {
  onRedirecting: () => <LoadingScreen />
});
