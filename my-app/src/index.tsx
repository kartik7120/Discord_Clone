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
import MiddleColumn from './components/MiddleColumn';
import RightColumn from './components/RightColumn';
// import { Global } from '@mantine/core';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider theme={{
      colorScheme: "dark",
      colors: {
        'discord_dark': ["#282b30", "#36393e", "#424549"],
        'discord_palette': ["#7289da", "#424549", "#36393e", "#282b30", "#1e2124", "#42464d", "#f2f3f5"]
      },
    }}
      withNormalizeCSS>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<App />}>
            <Route element={<FriendsBar />}>
              <Route index element={<ChatWindow />} />
            </Route>
            <Route path='/channel' element={<Channel />} >
              <Route path=':channelName' element={<MiddleColumn />}>
                <Route index element={<RightColumn />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
