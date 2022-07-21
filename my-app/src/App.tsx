import './App.css';
import ChatWindow from './components/ChatWindow';
import FriendsBar from './components/FriendsBar';
import ActiveNow from './components/ActiveNow';
import SideBar from "./components/SideBar";
function App() {
  return (
    <div className="App">
      <SideBar />
      <div className='Main-Tabs'>
        <FriendsBar />
        <ChatWindow />
        <ActiveNow />
      </div>
    </div>
  );
}

export default App;
