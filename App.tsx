import React from 'react';
import { SafeAreaView,} from 'react-native';
import { Provider } from 'mobx-react';
import {stores} from "./src/mobx";

import {NavigationContainer} from "@react-navigation/native";
import {
    Provider as AntdRnProvider,
} from '@ant-design/react-native'
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { OverlayProvider, Chat } from 'stream-chat-react-native';
import {AppProvider} from "./src/AppContext";
import { chatClient } from "./src/app/chat/steam/chatConfig";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {ThemeProvider} from './src/themeContext';
import {SearchContextProvider} from "./src/SearchContext";
import {NewMessageProvider} from "./src/NewMessageContext";
import {Apps} from "./src/app/Apps";


function App(): JSX.Element {


  return (
      <SafeAreaProvider>
          <NavigationContainer>
              <AppProvider>
                  <SearchContextProvider>
                          <AntdRnProvider>
                              <ThemeProvider>
                                  <Provider {...stores}>
                                      <GestureHandlerRootView style={{ flex: 1 }}>
                                          <SafeAreaView style={{ flex: 1 }}>
                                              <OverlayProvider>
                                                  <NewMessageProvider>
                                                      <Chat client={chatClient}>
                                                          <Apps />
                                                      </Chat>
                                                  </NewMessageProvider>
                                              </OverlayProvider>
                                          </SafeAreaView>
                                      </GestureHandlerRootView>
                                  </Provider>
                              </ThemeProvider>
                          </AntdRnProvider>
                  </SearchContextProvider>
              </AppProvider>
          </NavigationContainer>
      </SafeAreaProvider>
  );
}


export default App;
