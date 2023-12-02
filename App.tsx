import React from 'react';
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
import { chatClient } from "./src/app/chat/steam/chatConfig";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ChatListApp from "./src/app/chatlist";
import ThreadScreen from "./src/app/thread";
import {useChatClient} from "./src/app/chat/steam/useChatClient";
import {SearchContextProvider} from "./src/SearchContext";
import {NewMessageProvider} from "./src/NewMessageContext";
import {Apps} from "./src/app/Apps";


type IStackRouterParams = {
    home: undefined;
    datadash: undefined;
    chat: undefined;
    chatlist: undefined;
    threadscreen: undefined;
}


const Stack = createNativeStackNavigator<IStackRouterParams>();

function App(): JSX.Element {
    const {clientIsReady} = useChatClient();
    console.log('app begin clientIsReady ? -> ', clientIsReady)

    // console.log('start app... chatClient is : ->', chatClient)
  return (
      <SafeAreaProvider>
          <NavigationContainer>
              <AppProvider>
                  <SearchContextProvider>
                      <AntdRnProvider>
                      <Provider {...stores}>
                          <GestureHandlerRootView style={{ flex: 1 }}>
                              <SafeAreaView style={{ flex: 1 }}>
                                  <OverlayProvider>
                                      { clientIsReady && (
                                          <NewMessageProvider>
                                              <Chat client={chatClient}>
                                                  {/*<Stack.Navigator initialRouteName='chatlist'>
                                                      <Stack.Screen name='home' component={HomePageApp} options={{ headerShown: false }}/>
                                                      <Stack.Screen name='datadash' component={DatadashApp} />
                                                      <Stack.Screen name='chatlist' component={ChatListApp} />
                                                      <Stack.Screen name='chat' component={ChatApp} options={{ headerShown: false }}/>
                                                      <Stack.Screen name='threadscreen' component={ThreadScreen} />
                                                  </Stack.Navigator>*/}
                                                  <Apps />
                                              </Chat>
                                          </NewMessageProvider>
                                      ) }
                                  </OverlayProvider>
                              </SafeAreaView>
                          </GestureHandlerRootView>
                      </Provider>
                  </AntdRnProvider>
                  </SearchContextProvider>
              </AppProvider>
          </NavigationContainer>
      </SafeAreaProvider>
  );
}


export default App;
