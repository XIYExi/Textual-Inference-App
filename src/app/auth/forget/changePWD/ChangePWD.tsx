import {Button, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {inject, observer} from "mobx-react";
import {ActivityIndicator, Image, KeyboardAvoidingView, Pressable, StyleSheet} from "react-native";
import Input from "../../../../components/Input";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {useTranslation} from "react-i18next";


function ChangePWD() {

    const [password, setPassword] = useState('');
    const [confirmPWD, setConfirmPWD] = useState('');
    const navigation = useNavigation();

    const handleChange = () => {
        if (password !== confirmPWD){
            console.log('两次密码不一样')
        }
        else {
            // TODO 修改密码

            // @ts-ignore
            navigation.navigate('Login')
        }
    }

    const {t} = useTranslation();

    return(
        <KeyboardAvoidingView style={styles.login} behavior='padding'>
            <WhiteSpace size='xl' />
            <WhiteSpace size='xl' />
            <WingBlank style={{flex: 1}}>
                <Pressable onPress={() => {
                    //@ts-ignore
                    navigation.navigate('Wel')
                }}>
                    <Image source={require('../../../../assets/login/back.png')} style={styles.back}/>
                </Pressable>

                <Text style={styles.title}>{t('auth.forget.change.title')}🔒</Text>
                <Text style={styles.subTitle}>{t('auth.forget.change.subtitle')}</Text>

                <View style={{marginTop: 20,}}>
                    <Input
                        secure
                        label={t("auth.forget.change.newPWD")}
                        style={[styles.input]}
                        onChangeText={(text:string) => setPassword(text)}
                    />

                    <Input
                        secure
                        label={t("auth.forget.change.confirmPWD")}
                        style={[styles.input]}
                        onChangeText={(text:string) => setConfirmPWD(text)}
                    />

                    <Button onPress={handleChange}
                            style={{
                                backgroundColor: (password.length !== 0 && confirmPWD.length !== 0) ? '#12A575' : "#9DA3B4",
                                borderRadius: 100,
                                marginTop: 25,
                            }}
                            disabled={(password.length === 0 || confirmPWD.length === 0)}
                    >
                        <Text style={{
                            color: '#fff',
                            fontWeight: '600',
                            textAlign: 'center',
                        }}>
                            {t("auth.forget.email.continue")}
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
    }
})


export default inject('forgetStore')(observer(ChangePWD))
