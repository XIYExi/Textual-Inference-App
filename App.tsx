import React, {useEffect} from 'react';
import { SafeAreaView,} from 'react-native';
import { Provider } from 'mobx-react';
import {stores} from "./src/mobx";

import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {
    Provider as AntdRnProvider,
} from '@ant-design/react-native'
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { OverlayProvider, Chat } from 'stream-chat-react-native';
import {AppProvider} from "./src/AppContext";
import { chatClient } from "./src/app/chat/steam/chatConfig";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {ThemeProvider, useThemeContext} from './src/themeContext';
import {SearchContextProvider} from "./src/SearchContext";
import {NewMessageProvider} from "./src/NewMessageContext";
import {Apps} from "./src/app/Apps";


function App(): JSX.Element {

    const theme = useThemeContext();

  return (
      <SafeAreaProvider>
          <NavigationContainer theme={theme.mode === 'Light' ? DefaultTheme : DarkTheme}>
              <AppProvider>
                  <SearchContextProvider>
                      <AntdRnProvider>
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
                      </AntdRnProvider>
                  </SearchContextProvider>
              </AppProvider>
          </NavigationContainer>
      </SafeAreaProvider>
  );
}


/**
 * 建立一个的单独的函数并用ThemeProvider包裹，这样在App中就可以取到ThemeContext中的值！
 * @constructor
 */
function ThemeApp() {
    return (
        <ThemeProvider>
            <App />
        </ThemeProvider>
    )
}


export default ThemeApp;
