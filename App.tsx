/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import { SafeAreaView,} from 'react-native';
import { Provider } from 'mobx-react';
import {stores} from "./src/mobx";

import {NavigationContainer} from "@react-navigation/native";
import HomePageApp from "./src/app/home";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DatadashApp from "./src/app/datadash";
import ChatApp from "./src/app/chat";
import {
    Provider as AntdRnProvider,
} from '@ant-design/react-native'
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { OverlayProvider, Chat } from 'stream-chat-react-native';
import {AppProvider} from "./src/AppContext";
import {StreamChat} from "stream-chat";
import {chatApiKey} from "./src/app/chat/steam/chatConfig";
import ChatListApp from "./src/app/chatlist";


type IStackRouterParams = {
    home: undefined;
    datadash: undefined;
    chat: undefined;
    chatlist: undefined;
}


const Stack = createNativeStackNavigator<IStackRouterParams>();
const chatClient = StreamChat.getInstance(chatApiKey);

function App(): JSX.Element {

  return (
      <AppProvider>
          <AntdRnProvider>
              <Provider {...stores}>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                      <SafeAreaView style={{ flex: 1 }}>
                          <OverlayProvider>
                              <Chat client={chatClient}>
                                  <NavigationContainer>
                                      <Stack.Navigator initialRouteName='chat'>
                                          <Stack.Screen name='home' component={HomePageApp} options={{ headerShown: false }}/>
                                          <Stack.Screen name='datadash' component={DatadashApp} />
                                          <Stack.Screen name='chat' component={ChatApp} options={{ headerShown: false }}/>
                                          <Stack.Screen name='chatlist' component={ChatListApp} />
                                      </Stack.Navigator>
                                  </NavigationContainer>
                              </Chat>
                          </OverlayProvider>
                      </SafeAreaView>
                  </GestureHandlerRootView>
              </Provider>
          </AntdRnProvider>
      </AppProvider>


  );
}


export default App;
