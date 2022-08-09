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
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Auth0Provider } from '@auth0/auth0-react';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Auth0Provider domain='dev-6mnzakh2.us.auth0.com'
    clientId='TrpH2owRNMhbMYK860wtxBnWYS2ZPnnv' redirectUri='http://localhost:3000'>
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
              <Route path=':channel' element={<Channel />} >
                <Route path=':channelName' element={<MiddleColumn />}>
                  <Route index element={<RightColumn />} />
                </Route>
              </Route>
            </Route>
            <Route path='*' element={<div>This path does not exist</div>} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
