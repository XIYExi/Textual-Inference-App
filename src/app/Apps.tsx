import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomePageApp from "./home";
import DatadashApp from "./datadash";
import {useAppContext} from "../AppContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import ChatApp from "./chat/ChatApp";
import {StatusBar} from "react-native";
import {Text, View} from "@ant-design/react-native";
import {NavigatorScreenParams} from "@react-navigation/native";
import ChannelHeader, {CHANNEL_SCREEN_HEADER_HEIGHT} from "./chat/ChannelHeader";
import {Channel, useTheme} from 'stream-chat-react-native';
import {CHANNEL_LIST_SCREEN_HEADER_HEIGHT, ChannelListHeader} from "./chatlist/ChannelListHeader";
import ChannelListScreenApp from "./chatlist/ChannelListScreenApp";
import ApiApp from "./api/ApiApp";
import LoginApp from "./login/LoginApp";
import RegisterApp from "./register/RegisterApp";
import {useChatClient} from "./chat/steam/useChatClient";
import LoadingApp from "./loading/LoadingApp";
import WelcomeApp from "./wel/welcome/WelcomeApp";
import IntroductionApp from "./wel/introduction/IntroductionApp";


const MainStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const WelStack = createNativeStackNavigator();

// Navigation types
export type NavigationParamsList = {
    Wel: NavigatorScreenParams<{
        Introduction: undefined;
        Welcome: undefined;
    }>;
    Home: undefined;
    Api: undefined;
    Datadash: undefined;
    Main: NavigatorScreenParams<{
        Channel: undefined;
        ChannelList: undefined;
        Loading: undefined;
    }>;
    NewMessage: undefined;
    Auth: NavigatorScreenParams<{
        Login: undefined;
        Register: undefined;
    }>
};


const WelStackScreen = () => {

    return (
        <WelStack.Navigator initialRouteName='Introduction'>
            <WelStack.Screen name='Introduction' component={IntroductionApp} options={{headerShown: false}}/>
            <WelStack.Screen name='Welcome' component={WelcomeApp} options={{headerShown: false}}/>
        </WelStack.Navigator>
    )
}


const MainStackScreen = () => {
    const {channel} = useAppContext();
    const insets = useSafeAreaInsets();
    const {clientIsReady} = useChatClient();
    console.log('app begin clientIsReady ? -> ', clientIsReady)

    const {
        theme: {
            colors: {white_snow},
        },
    } = useTheme();

    return (
        <MainStack.Navigator
            initialRouteName="ChannelList"
        >
            {
                clientIsReady ? (
                    <>
                        <MainStack.Screen
                            name='Channel'
                            component={ChatApp as any}
                            options={() => {
                                return {
                                    header: props =>
                                        !!insets.top && (
                                            <>
                                                <StatusBar
                                                    backgroundColor="transparent"
                                                    translucent
                                                    barStyle="dark-content"
                                                />
                                                <View
                                                    style={{
                                                        paddingTop: insets.top,
                                                        height: CHANNEL_SCREEN_HEADER_HEIGHT + insets.top,
                                                    }}>
                                                    <Channel channel={channel as any}>
                                                        <ChannelHeader {...props as any} channel={channel} />
                                                    </Channel>
                                                </View>
                                            </>
                                        ),
                                };
                            }}
                        />
                        <MainStack.Screen
                            name='ChannelList'
                            component={ChannelListScreenApp}
                            options={{
                                header: () => (
                                    <>
                                        <StatusBar
                                            backgroundColor="transparent"
                                            translucent
                                            barStyle="dark-content"
                                        />
                                        <View
                                            style={{
                                                paddingTop: insets.top,
                                                height: CHANNEL_LIST_SCREEN_HEADER_HEIGHT + insets.top,
                                                backgroundColor: white_snow,
                                            }}>
                                            <ChannelListHeader />
                                        </View>
                                    </>
                                ),
                            }}
                        />
                    </>
                ) : (
                    /**
                     * 当chatClient尚未连接成功时显示的加载页面
                     */
                    <MainStack.Screen
                        name='Loading'
                        component={LoadingApp}
                    />
                )
            }

        </MainStack.Navigator>
    )
}


const AuthStackScreen = () => {

    return (
        <AuthStack.Navigator
            initialRouteName='Login'
        >
            <AuthStack.Screen
                name='Login'
                component={LoginApp}
                options={{headerShown: false}}
            />
            <AuthStack.Screen name='Register' component={RegisterApp}/>
        </AuthStack.Navigator>
    )
}


export const Apps = () => {


    return (
        <RootStack.Navigator
            initialRouteName='Wel'
        >
            <RootStack.Screen
                name='Wel'
                component={WelStackScreen}
                options={{headerShown: false}}
            />
            <RootStack.Screen
                name='Auth'
                component={AuthStackScreen}
                options={{headerShown: false}}
            />
            <RootStack.Screen
                name='Home'
                component={HomePageApp}
                options={{ headerShown: false }}
            />
            <RootStack.Screen
                name='Api'
                component={ApiApp}
            />
            <RootStack.Screen
                name='Datadash'
                component={DatadashApp}
                options={{ headerShown: false }}
            />
            <RootStack.Screen
                name='Main'
                component={MainStackScreen}
                options={{headerShown: false}}
            />
        </RootStack.Navigator>
    )
}
