import {Button, Checkbox, Flex, Modal, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {ActivityIndicator, Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet} from "react-native";
import Input from "../../../components/Input";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";

function RegisterApp(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    const navigation = useNavigation();
    const [open, setOpen] = useState(false);

    const handleRegister = () => {
        // TODO 发送后端进行注册，请求期间加载loading
        //  需要注意，当用户进行注册的时候在数据库中用户数据就已经被注册好了，但是有数据的字段只有email，pwd和id。
        //  其余都是使用默认值填充！在下一个页面中只是对数据继续update

        //@ts-ignore
        navigation.navigate('Fillin');
    }

    const checkUserDetails = () => {
        setChecked(prevState => !prevState);
    }

    const checkDisabled = () => {
        // TODO 校验email是否合法

        // 判断是否可以点击下一步
        return !(email.length !== 0 && password.length !== 0 && checked);
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

                <Text style={styles.title}>你好，👋</Text>
                <Text style={styles.subTitle}>请输入您的电子邮件和密码以创建帐户。</Text>

                <View style={{marginTop: 20,}}>
                    <Input
                        label='邮箱'
                        style={[styles.input]}
                        onChangeText={(text:string) => setEmail(text)}
                    />
                    <Input
                        secure
                        label="密码"
                        style={[styles.input]}
                        onChangeText={(text:string) => setPassword(text)}
                    />

                    <Checkbox onChange={checkUserDetails} checked={checked}>
                        <Pressable onPress={() => setOpen(true)}>
                            <Text style={{color: '#9DA3B4'}}>我同意ChattyAI使用协议</Text>
                        </Pressable>
                    </Checkbox>

                    <Button onPress={handleRegister}
                            style={{
                                backgroundColor: !checkDisabled() ? '#12A575' : "#9DA3B4",
                                borderRadius: 100,
                                marginTop: 25,
                            }}
                            disabled={checkDisabled()}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={{
                                color: '#fff',
                                fontWeight: '600',
                                textAlign: 'center',
                            }}>
                                继续
                            </Text>
                        )}
                    </Button>

                </View>

                {/*用户使用协议*/}
                <Modal
                    popup
                    visible={open}
                    animationType="slide-up"
                    style={styles.modal}
                >
                    <View>
                        <WingBlank>
                            <View style={{
                                paddingVertical: 20,
                                paddingHorizontal: 20,
                            }}>

                                <Flex justify='between' align='center'>
                                    <Text style={styles.modalTitle}>
                                        使用协议
                                    </Text>

                                    <Pressable onPress={() => {setOpen(prevState => !prevState)}}>
                                        <View
                                            style={{
                                                marginRight: 5,
                                                backgroundColor: '#fff',
                                                borderRadius: 12,
                                                zIndex: 100,
                                                borderWidth: 0,
                                            }}
                                        >
                                            <Image
                                                source={require('../../../assets/chat/close.png')}
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                }}
                                            />
                                        </View>
                                    </Pressable>
                                </Flex>

                            </View>

                            <ScrollView
                                style={{height: 500, paddingLeft: 5, paddingRight: 5,}}
                                contentContainerStyle={styles.contentContainer}
                            >
                                <Text>欢迎您使用腾讯统一身份产品及服务！</Text>

                                <Text>为使用腾讯统一身份产品（以下统称“本产品”）及服务（以下统称“本服务”），您应当阅读并遵守《腾讯统一身份 用户服务协议》（以下简称“本协议”），以及 《腾讯服务协议》、 《腾讯隐私政策》、 《腾讯统一身份隐私保护指引》。</Text>

                                <Text>请您在注册成为腾讯统一身份用户前务必审慎阅读、充分理解各条款内容，特别是免除或者限制腾讯责任的条款、对用户权利进行限制的条款、约定争议解决方式和司法管辖的条款等，以及开通或使用某项服务的单独协议。限制、免责条款或者其他涉及您重大权益的条款可能以加粗、加下划线等形式提示您重点注意。您应重点阅读，如果您对协议有任何疑问，请联系我们进行咨询。</Text>

                                <Text>除非您已阅读并接受本协议所有条款，否则您无权使用腾讯统一身份服务。您的注册、登录、发布信息等行为即视为您已阅读并同意本协议的约束。如果您因年龄、智力等因素而不具有完全民事行为能力，请在法定监护人（以下简称"监护人"）的陪同下阅读和判断是否同意本协议。如果您是中国大陆地区以外的用户，您订立或履行本协议以及使用本服务的行为还需要同时遵守您所属和/或所处国家或地区的法律。</Text>

                                <Text>腾讯统一身份用户：指以企业名义注册、登录、使用腾讯统一身份产品及服务并获得管理权限的组织（“企业用户”）。</Text>

                                <Text>最终用户：指由企业用户为其开通腾讯统一身份产品服务，或被企业用户邀请加入企业组织，使用腾讯统一身份的个人或个人用户。</Text>

                                <Text>
                                    管理员：指当您为企业用户时，指取得您合法授权的委托代理人，管理员权限范围包括但不限于管理人员、部门，管理认证源，管理单点登录应用等腾讯统一身份操作权限。您同意管理员的行为均代表您的意志，与您的行为具有同等法律效力。您同意承担管理员行为的全部法律后果和法律责任。
                                </Text>

                                <Text>前述“腾讯统一身份用户”及“最终用户”统称为“用户”或“所有用户”，在本协议中更多地称为“您”。</Text>


                                <Button type="primary"
                                        onPress={() => {
                                            setChecked(true);
                                            setOpen(prevState => !prevState)
                                        }}
                                        style={{marginTop: 20,}}
                                >
                                    确认
                                </Button>

                            </ScrollView>

                            <WhiteSpace size='xl'/>
                        </WingBlank>
                    </View>
                </Modal>

            </WingBlank>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    modal: {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        height: 550,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '600',
        fontStyle: 'normal',
        color: 'rgba(0,0,0,0.8)',
    },
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
    contentContainer: {
        paddingTop: 10,
        paddingBottom: 40,
    }
})


export default RegisterApp;
