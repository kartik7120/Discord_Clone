import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FriendsBar from './components/FriendsBar';
import ChatWindow from './components/ChatWindow';
import Channel from './components/Channel';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider theme={{
      colorScheme: "dark",
      colors: {
        'discord_dark': ["#282b30", "#36393e", "#424549"],
        'discord_palette': ["#7289da", "#424549", "#36393e", "#282b30", "#1e2124"]
      }
    }}>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<App />}>
            <Route element={<FriendsBar />}>
              <Route index element={<ChatWindow />} />
            </Route>
            <Route path='/channel' element={<Channel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
