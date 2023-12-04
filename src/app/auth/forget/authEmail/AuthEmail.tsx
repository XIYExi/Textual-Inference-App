import {Button, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {ActivityIndicator, Image, KeyboardAvoidingView, Pressable, StyleSheet} from "react-native";
import Input from "../../../../components/Input";
import {inject, observer} from "mobx-react";
import {useNavigation} from "@react-navigation/native";

function AuthEmail(props: any) {

    const {forgetStore} = props;
    const navigation = useNavigation();

    const handleNext = () => {
        // TODO 验证仅输入是否为合法邮箱 【此处不验证邮箱是否存在，如果用户输入邮箱不存在那么验证码也发不出去】

        // @ts-ignore
        navigation.navigate('AuthOTP');
    }

    return (
        <KeyboardAvoidingView style={styles.login} behavior='padding'>
            <WhiteSpace size='xl' />
            <WingBlank style={{flex: 1}}>
                <Pressable onPress={() => {
                    //@ts-ignore
                    navigation.navigate('Login')
                }}>
                    <Image source={require('../../../../assets/login/back.png')} style={styles.back}/>
                </Pressable>

                <Text style={styles.title}>重置您的密码🔑</Text>
                <Text style={styles.subTitle}>请输入您的电子邮件，我们将在下一步发送OTP代码以重置您的密码。</Text>

                <View style={{marginTop: 20,}}>
                    <Input
                        label='邮箱'
                        error={false}
                        style={[styles.input]}
                        onChangeText={(text:string) => forgetStore?.changeEmail(text)}
                    />

                    <Button onPress={handleNext}
                            style={{
                                backgroundColor: '#12A575',
                                borderRadius: 100,
                                marginTop: 35,
                            }}
                    >
                        <Text style={{
                            color: '#fff',
                            fontWeight: '600',
                            textAlign: 'center',
                        }}>
                            继续
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


export default inject('forgetStore')(observer(AuthEmail));
