/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
    SafeAreaView,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
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

type IStackRouterParams = {
    home: undefined;
    datadash: undefined;
    chat: undefined;
}


const Stack = createNativeStackNavigator<IStackRouterParams>();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <AntdRnProvider>
          <Provider {...stores}>
              <NavigationContainer>
                  <Stack.Navigator initialRouteName='chat'>
                      <Stack.Screen name='home' component={HomePageApp} options={{ headerShown: false }}/>
                      <Stack.Screen name='datadash' component={DatadashApp} />
                      <Stack.Screen name='chat' component={ChatApp} options={{ headerShown: false }}/>
                  </Stack.Navigator>
              </NavigationContainer>
          </Provider>
      </AntdRnProvider>
  );
}


export default App;
