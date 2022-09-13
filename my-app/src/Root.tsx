import React from "react"
import './index.css';
import App from './App';
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
import FriendMiddle from "./components/FriendMiddle";
const queryClient = new QueryClient();

function Root() {
    const [colorSchema, setColorSchema] = React.useState<ColorScheme>("dark");
    console.log(`Deployment url = ${process.env.REACT_APP_VERCEL_URL}`);
    const toggleColorScheme = (value?: ColorScheme) => setColorSchema(value || (colorSchema === "dark" ? "light" : "dark"));
    return <Auth0Provider domain={`${process.env.REACT_APP_AUTH_DOMAIN}`}
        clientId={`${process.env.REACT_APP_CLIEND_ID}`} redirectUri={`https://discord-clone-virid.vercel.app/`}
        audience={`${process.env.REACT_APP_AUDIENCE}`}
        scope='read:current_user update:current_user_metadata'
    >
        <QueryClientProvider client={queryClient}>
            <ColorSchemeProvider colorScheme={colorSchema} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{
                    colorScheme: colorSchema,
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
                                        <Route path="friend/:id" element={<FriendMiddle />} />
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