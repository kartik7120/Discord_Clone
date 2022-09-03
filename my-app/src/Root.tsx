import ReactDOM from 'react-dom/client';
import React from "react"
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
import { NotificationsProvider } from '@mantine/notifications';
import { ColorSchemeProvider, ColorScheme } from '@mantine/core';
import ExploreComponents from './components/exploreChannel';
import Home from "./components/Home"
const queryClient = new QueryClient();

function Root() {
    const [colorSchema, setColorSchema] = React.useState<ColorScheme>("light");
    const toggleColorScheme = (value?: ColorScheme) => setColorSchema(value || (colorSchema === "dark" ? "light" : "dark"))
    return <Auth0Provider domain='dev-6mnzakh2.us.auth0.com'
        clientId='TrpH2owRNMhbMYK860wtxBnWYS2ZPnnv' redirectUri='http://localhost:3000'
        audience='https://dev-6mnzakh2.us.auth0.com/api/v2/'
        scope='read:current_user update:current_user_metadata'
    >
        <QueryClientProvider client={queryClient}>
            <ColorSchemeProvider colorScheme={colorSchema} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{
                    colorScheme:"dark",
                    colors: {
                        'discord_dark': ["#282b30", "#36393e", "#424549"],
                        'discord_palette': ["#7289da", "#424549", "#36393e", "#282b30", "#1e2124", "#42464d", "#f2f3f5"]
                    },
                }}
                    withNormalizeCSS>
                    <NotificationsProvider>
                        <BrowserRouter >
                            <Routes>
                                <Route path="/home" element={<Home />} />
                                <Route path='/' element={<App />}>
                                    <Route element={<FriendsBar />}>
                                        <Route index element={<ChatWindow />} />
                                        <Route path='explore' element={<ExploreComponents />} />
                                    </Route>
                                    <Route path=':channel'>
                                        <Route path=':id' element={<Channel />}>
                                            <Route path=':channelName/:roomId' element={<MiddleColumn />}>
                                                <Route index element={<RightColumn />} />
                                            </Route>
                                        </Route>
                                    </Route>
                                </Route>
                                <Route path='*' element={<div>This path does not exist</div>} />
                            </Routes>
                        </BrowserRouter>
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider >
            <ReactQueryDevtools />
        </QueryClientProvider>
    </Auth0Provider>
}
export default Root;