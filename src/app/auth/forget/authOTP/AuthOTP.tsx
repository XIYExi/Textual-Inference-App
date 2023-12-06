import {Button, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {inject, observer} from "mobx-react";
import {Image, KeyboardAvoidingView, Pressable, StyleSheet, TextInput} from "react-native";
import {useState} from "react";
import CodeInput from "./CodeInput";
import {useNavigation} from "@react-navigation/native";
import {useTranslation} from "react-i18next";

function AuthOTP(props:any) {

    const {forgetStore} = props;
    const [value, setValue] = useState('');
    const navigation = useNavigation();

    const handleCheck = () => {
        console.log('value is: -> ', value)
        // @ts-ignore
        navigation.navigate('ChangePWD');
    }

    const {t} = useTranslation();

    return (
        <KeyboardAvoidingView style={styles.login} behavior='padding'>
            <WhiteSpace size='xl' />
            <WhiteSpace size='xl' />
            <WingBlank style={{flex: 1}}>
                <Pressable onPress={() => {
                    //@ts-ignore
                    navigation.navigate('Login')
                }}>
                    <Image source={require('../../../../assets/login/back.png')} style={styles.back}/>
                </Pressable>

                <Text style={styles.title}>{t("auth.forget.otp.title")}🔐</Text>
                <Text style={styles.subTitle}>{t('auth.forget.otp.subtitle_1')}{forgetStore?.email}.{t('auth.forget.otp.subtitle_2')}</Text>

                <View style={{marginTop: 25}}>
                    <CodeInput style={styles.codeInput} value={value} onValueChange={setValue} />
                        <Button onPress={handleCheck}
                                style={{
                                    backgroundColor: value.length === 4 ? '#12A575' : "#9DA3B4",
                                    borderRadius: 100,
                                    marginTop: 35,
                                }}
                                disabled={value.length !== 4}
                        >
                            <Text style={{
                                color: '#fff',
                                fontWeight: '600',
                                textAlign: 'center',
                            }}>
                                {t('auth.forget.email.continue')}
                            </Text>
                        </Button>
                </View>
            </WingBlank>
        </KeyboardAvoidingView>
    )
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
    },
    codeInput: {
        marginTop: 16,
    },

})



export default inject('forgetStore')(observer(AuthOTP))
