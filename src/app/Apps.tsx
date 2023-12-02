import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomePageApp from "./home";
import DatadashApp from "./datadash";
import {useAppContext} from "../AppContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import ChatApp from "./chat";
import {StatusBar} from "react-native";
import {View} from "@ant-design/react-native";
import {NavigatorScreenParams} from "@react-navigation/native";
import {CHANNEL_SCREEN_HEADER_HEIGHT, ChannelHeader} from "./chat/ChannelHeader";
import {Channel, useTheme} from 'stream-chat-react-native';
import {CHANNEL_LIST_SCREEN_HEADER_HEIGHT, ChannelListHeader} from "./chatlist/ChannelListHeader";
import ChannelListScreenApp from "./chatlist/ChannelListScreenApp";


const MainStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();


// Navigation types
export type NavigationParamsList = {
    Home: undefined;
    Datadash: undefined;
    Main: NavigatorScreenParams<{
        Channel: undefined;
        ChannelList: undefined;
    }>;
    NewMessage: undefined;
};


const MainStackScreen = () => {
    const {channel} = useAppContext();
    const insets = useSafeAreaInsets();

    const {
        theme: {
            colors: {white_snow},
        },
    } = useTheme();

    return (
        <MainStack.Navigator
            initialRouteName="ChannelList"
        >
            <MainStack.Screen
                name='Channel'
                component={ChatApp}
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
        </MainStack.Navigator>
    )
}




export const Apps = () => {


    return (
        <RootStack.Navigator>
            <RootStack.Screen
                name='Home'
                component={HomePageApp}
                options={{ headerShown: false }}
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
