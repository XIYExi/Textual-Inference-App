import {Button, Flex, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {removeItem} from "../../../utils/asyncStorage";
import {useNavigation} from "@react-navigation/native";

function WelcomeApp() {

    const navigation = useNavigation();

    const tutor = async () => {
        await removeItem('introduction');
        // @ts-ignore
        navigation.navigate('Introduction');
    }

    return (
        <WingBlank>
            <WhiteSpace size='xl'/>
            <WhiteSpace size='xl'/>
            <WhiteSpace size='xl'/>

            <TouchableOpacity style={{padding: 20}} onPress={tutor}>
                <Text>完成</Text>
            </TouchableOpacity>

            {/*Login Container Begin*/}
            <Flex style={styles.LoginContainer} justify='center' direction='column'>
                {/*Login*/}
                <Image source={require('../../../assets/login/logo.png')} style={styles.logo}/>

                {/*Title*/}
                <View style={styles.title}>
                    <Text style={styles.firstTitle}>欢迎来到</Text>
                    <Text style={styles.secondTitle}>ChattyAI 👋</Text>
                </View>
            </Flex>

            {/*Login Form*/}
            <View style={{marginTop: 35, zIndex: 100,}}>
                <Button style={styles.loginBtn} onPress={() => console.log('Login...')}>
                    <Text style={{color: '#fff'}}>登录</Text>
                </Button>
                <Button style={styles.registerBtn} onPress={() => console.log('Register...')}>
                    <Text style={{color: '#17CE92'}}>注册</Text>
                </Button>
            </View>
            {/*Login Container End*/}

            <WhiteSpace size='xl'/>
            <WhiteSpace size='xl'/>
            <WhiteSpace size='xl'/>
        </WingBlank>
    )
}

const styles = StyleSheet.create({
    LoginContainer: {
        marginTop: 20,
    },
    logo: {
        width: 110,
        height: 110,
    },
    title: {
        marginTop: 60,
    },
    firstTitle: {
        textAlign: 'center',
        fontSize: 36,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 64,
        color: '#212121',
    },
    secondTitle: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: '600',
        fontStyle: 'normal',
        lineHeight: 64,
        color: '#17CE92'
    },
    loginBtn: {
        borderRadius: 100,
        backgroundColor: '#17CE92',
        marginVertical: 12,
        alignSelf: 'stretch',
        gap: 10,
        justifyContent: 'center',
        borderWidth: 0,
        zIndex: 100,
    },
    registerBtn: {
        borderRadius: 100,
        backgroundColor: '#E8FAF4',
        alignSelf: 'stretch',
        gap: 10,
        justifyContent: 'center',
        borderWidth: 0,
        marginTop: 12,
        zIndex: 100,
    },
})


export default WelcomeApp;
