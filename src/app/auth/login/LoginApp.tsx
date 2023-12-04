import {Button, Flex, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {ActivityIndicator, Image, KeyboardAvoidingView, Pressable, StyleSheet} from "react-native";
import Input from "../../../components/Input";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";

/**
 * 登录页面
 * @constructor
 */
const _email = "contact@react-ui-kit.com";
const _password = "subscribe";

function LoginApp() {

    const [email, setEmail] = useState(_email);
    const [password, setPassword] = useState(_password);

    const [errors, setErrors] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const hasErrors = (key:any) => (errors.includes(key) ? styles.hasErrors : null);

    const navigation = useNavigation();

    const handleLogin = () => {
        // @ts-ignore
        navigation.navigate('Home')
    }

    return (
        <KeyboardAvoidingView style={styles.login} behavior='padding'>
            <WhiteSpace size='xl' />
            <WingBlank style={{flex: 1}}>
                <Pressable onPress={() => {
                    //@ts-ignore
                    navigation.navigate('Wel')
                }}>
                    <Image source={require('../../../assets/login/back.png')} style={styles.back}/>
                </Pressable>

                <Text style={styles.title}>欢迎回来👋</Text>
                <Text style={styles.subTitle}>请输入您的电子邮箱和密码以登录</Text>

                <View style={{marginTop: 20,}}>
                    <Input
                        label='邮箱'
                        error={hasErrors('email')}
                        style={[styles.input, hasErrors('email')]}
                        defaultValue={email}
                        onChangeText={(text:string) => setEmail(text)}
                    />
                    <Input
                        secure
                        label="密码"
                        error={hasErrors("password")}
                        style={[styles.input, hasErrors("password")]}
                        defaultValue={password}
                        onChangeText={(text:string) => setPassword(text)}
                    />

                    <Button onPress={handleLogin}
                            style={{
                                backgroundColor: '#12A575',
                                borderRadius: 100,
                                marginTop: 25,
                            }}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={{
                                color: '#fff',
                                fontWeight: '600',
                                textAlign: 'center',
                            }}>
                                登录
                            </Text>
                        )}
                    </Button>


                    <Button
                        onPress={() => {
                            //console.log('忘记密码')
                            //@ts-ignore
                            navigation.navigate('Forget');
                        }}
                        style={{
                            borderRadius: 100,
                            marginTop: 12,
                        }}
                    >
                        <Text
                            style={{
                                textDecorationLine: "underline",
                                color: "#9DA3B4",
                                textAlign: 'center',
                                fontWeight: '600',
                            }}
                        >
                            忘记密码?
                        </Text>
                    </Button>

                </View>

            </WingBlank>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#fff'
    },
    back: {
        width: 28,
        height: 28,
    },
    title: {
        marginTop: 24,
        color: '#212121',
        fontSize: 28,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 50,
    },
    subTitle: {
        marginTop: 16,
        color: '#212121',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 28.8,
        letterSpacing: 0.2,
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: "#C5CCD6",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    hasErrors: {
        borderBottomColor: "#F3534A",
    }
})


export default LoginApp;
