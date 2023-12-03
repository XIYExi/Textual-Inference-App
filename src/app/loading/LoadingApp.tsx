import {Text, View} from "@ant-design/react-native";

/**
 * 此页面用于给ChatList页面加载时先使用，
 * 进入App会先要求用户登录，当用户登录成功的时候系统就用用户信息去连接stream-chat，
 * 如遇到网络卡顿等情况，当用户进入系统后聊天还没刷新好的时候就会先显示加载页面,
 * 一旦连接成功，那么chatClient信息会通过hook自动推送，那么就会跳转到正确的页面上。
 * @constructor
 */
function LoadingApp() {

    return(
        <View>
            <Text>Loading for chatClient...</Text>
        </View>
    )
}

export default LoadingApp;
