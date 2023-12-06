import {Button, Flex, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {ActivityIndicator, Image, KeyboardAvoidingView, Pressable, StyleSheet} from "react-native";
import Input from "../../../components/Input";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {port} from "../../../utils/port";
import {inject, observer} from "mobx-react";
import {useTranslation} from "react-i18next";

/**
 * 登录页面
 * @constructor
 */
const _email = "123@163.com";
const _password = "123456";

function LoginApp(props: any) {

    const [email, setEmail] = useState(_email);
    const [password, setPassword] = useState(_password);

    const [errors, setErrors] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const hasErrors = (key:any) => (errors.includes(key) ? styles.hasErrors : null);

    const navigation = useNavigation();

    const {userStore} = props;

    const getUserSetting = async (id:string) => {
        await fetch(`${port}/auth/setting`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                id: id,
            }),
        })
            .then(response => response.json())
            .then(data => {
                const {res} = data.data;
                console.log('res', data);

                if (res.error) {
                    // TODO 【用户数据获取失败】 error样式
                }

                const {success} = res;
                // 先保存一份到store中
                userStore?.storeSetting({
                    settingId: success.id,
                    language: success.language,
                    mode: success.mode == 0 ? 'Light' : 'Dark',
                })

            })
            .catch(err => {
                console.log(`【用户数据获取失败】 -> ${err}`);
            })
    };

    const handleLogin = async () => {
        await fetch(`${port}/auth/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response:any) => response.json())
            .then((data:any) => {
                const {res} = data.data;

                if (res.error) {
                    setErrors(res.error);
                    return;
                }

                // 全局存储用户信息给后续页面使用
                const {success} = res;
                userStore.storeUser(success);

                // 查询用户设置，用于更新app配置
                getUserSetting(success.id);

                // @ts-ignore
                navigation.navigate('Homes');
            })
            .catch(err => {
                console.log(`【登录认证失败】 -> ${err}`);
            })
    }

    const {t} = useTranslation();

    return (
        <KeyboardAvoidingView style={styles.login} behavior='padding'>
            <WhiteSpace size='xl' />
            <WhiteSpace size='xl' />
            <WingBlank style={{flex: 1}}>
                <Pressable onPress={() => {
                    //@ts-ignore
                    navigation.navigate('Wel')
                }}>
                    <Image source={require('../../../assets/login/back.png')} style={styles.back}/>
                </Pressable>

                <Text style={styles.title}>{t('auth.login.title')}👋</Text>
                <Text style={styles.subTitle}>{t('auth.login.subtitle')}</Text>

                <View style={{marginTop: 20,}}>
                    <Input
                        label={t('auth.login.form.email')}
                        error={hasErrors('email')}
                        style={[styles.input, hasErrors('email')]}
                        defaultValue={email}
                        onChangeText={(text:string) => setEmail(text)}
                    />
                    <Input
                        secure
                        label={t('auth.login.form.password')}
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
                                {t('auth.login.form.submit')}
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
                            {t('auth.login.form.forget')}
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


export default inject('userStore')(observer(LoginApp));
