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
import LoginApp from "./auth/login/LoginApp";
import RegisterApp from "./auth/register/RegisterApp";
import {useChatClient} from "./chat/steam/useChatClient";
import LoadingApp from "./loading/LoadingApp";
import WelcomeApp from "./wel/welcome/WelcomeApp";
import IntroductionApp from "./wel/introduction/IntroductionApp";
import {useEffect, useState} from "react";
import {getItem} from "../utils/asyncStorage";
import AuthEmail from "./auth/forget/authEmail/AuthEmail";
import AuthOTP from "./auth/forget/authOTP/AuthOTP";
import ChangePWD from "./auth/forget/changePWD/ChangePWD";
import FillinApp from "./auth/fillin/FillinApp";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import UserApp from "./user/UserApp";


const MainStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const WelStack = createNativeStackNavigator();
const ForgetStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navigation types
export type NavigationParamsList = {
    Wel: NavigatorScreenParams<{
        Introduction: undefined;
        Welcome: undefined;
    }>;
    Home: undefined;
    Login: undefined;
    Register: undefined;
    Fillin: undefined;
    Api: undefined;
    Datadash: undefined;
    Main: NavigatorScreenParams<{
        Channel: undefined;
        ChannelList: undefined;
        Loading: undefined;
    }>;
    NewMessage: undefined;
    Forget: NavigatorScreenParams<{
        AuthEmail: undefined;
        AuthOTP: undefined;
        ChangePWD: undefined;
    }>
};


const WelStackScreen = () => {

    const [showIntroduction, setShowIntroduction] = useState<any>(null);
    useEffect(() => {
        checkIfAlreadyIntroduction();
    }, [])

    const checkIfAlreadyIntroduction = async () => {
        let intro = await getItem('introduction');
        console.log('intro: ->', intro)
        if (intro === '1') {
            // hidden
            setShowIntroduction(false);
        }
        else {
            // show
            setShowIntroduction(true);
        }
    }

    if(showIntroduction === null){
        return null;
    }

    if (showIntroduction) {
        return (
            <WelStack.Navigator initialRouteName='Introduction'>
                <WelStack.Screen name='Introduction' component={IntroductionApp} options={{headerShown: false}}/>
                <WelStack.Screen name='Welcome' component={WelcomeApp} options={{headerShown: false}}/>
            </WelStack.Navigator>
        )
    }
    else {
        return (
            <WelStack.Navigator initialRouteName='Welcome'>
                <WelStack.Screen name='Introduction' component={IntroductionApp} options={{headerShown: false}}/>
                <WelStack.Screen name='Welcome' component={WelcomeApp} options={{headerShown: false}}/>
            </WelStack.Navigator>
        )
    }
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

const ForgetStackScreen = () => {
    return (
        <ForgetStack.Navigator initialRouteName='AuthEmail'>
            <ForgetStack.Screen
                name='AuthEmail'
                component={AuthEmail}
                options={{headerShown: false}}
            />
            <ForgetStack.Screen
                name='AuthOTP'
                component={AuthOTP}
                options={{headerShown: false}}
            />
            <ForgetStack.Screen
                name='ChangePWD'
                component={ChangePWD}
                options={{headerShown: false}}
            />
        </ForgetStack.Navigator>
    )
}


const TabScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
        >
            <Tab.Screen name='Home' component={HomePageApp} options={{headerShown: false}}/>
            <Tab.Screen name='User' component={UserApp} options={{headerShown: false}} />
        </Tab.Navigator>
    )
}


export const Apps = () => {

    return (
        <RootStack.Navigator
            initialRouteName='Login'
        >
            <RootStack.Screen
                name='Wel'
                component={WelStackScreen}
                options={{headerShown: false}}
            />
            <RootStack.Screen
                name='Login'
                component={LoginApp}
                options={{headerShown: false}}
            />
            <RootStack.Screen
                name='Register'
                component={RegisterApp}
                options={{headerShown: false}}
            />
            <RootStack.Screen
                name='Fillin'
                component={FillinApp}
                options={{headerShown: false}}
            />
            <RootStack.Screen
                name='Forget'
                component={ForgetStackScreen}
                options={{headerShown: false}}
            />
            <RootStack.Screen
                name='Homes'
                component={TabScreen}
                options={{headerShown: false}}
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
