import {Button, Flex, ImagePicker, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {useState} from "react";
import {ActivityIndicator, Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet} from "react-native";
import Input from "../../../components/Input";
import {useNavigation} from "@react-navigation/native";


/**
 * 完善个人信息页面，直接跳过则使用默认信息
 * @constructor
 */
function FillinApp() {

    const [name, setName] = useState('');
    const navigation = useNavigation();
    const [phone, setPhone] = useState('');

    const handleUpdate = () => {
        // TODO 更新用户数据

        //@ts-ignore
        navigation.navigate('Home');
    }


    return (
        <KeyboardAvoidingView style={styles.login} behavior='padding'>
            <WhiteSpace size='xl' />
            <WingBlank style={{flex: 1}}>

                <Text style={styles.title}>填写您的个人资料📋</Text>
                <Text style={styles.subTitle}>请输入您的个人资料。别担心，只有你才能看到你的个人数据。其他人将无法看到它。或者你可以暂时跳过它。</Text>

                <ScrollView style={{marginTop: 20, flex: 1, marginBottom: 20,}}>

                    <Flex justify='center'>
                        {/*TODO 预览和上传头像*/}
                        <ImagePicker />
                    </Flex>

                    <Input
                        label='昵称'
                        style={[styles.input]}
                        onChangeText={(text:string) => setName(text)}
                    />
                    <Input
                        secure
                        label="电话"
                        style={[styles.input]}
                        onChangeText={(text:string) => setPhone(text)}
                    />
                    <Input
                        secure
                        label="职业方向"
                        style={[styles.input]}
                        onChangeText={(text:string) => setPhone(text)}
                    />

                    <Input
                        secure
                        label="性别"
                        style={[styles.input]}
                        onChangeText={(text:string) => setPhone(text)}
                    />

                    <Input
                        secure
                        label="出生年月"
                        style={[styles.input]}
                        onChangeText={(text:string) => setPhone(text)}
                    />

                </ScrollView>

                <Flex justify='between' style={{marginTop: 10, marginBottom: 30}}>
                    <Button
                        style={{
                            backgroundColor: '#E8FAF4',
                            borderRadius: 100,
                            width: '45%',
                            borderWidth: 0,
                        }}
                        onPress={() => {
                            //@ts-ignore
                            navigation.navigate('Home')
                        }}
                    >
                        <Text style={{
                            color: '#12A575',
                            fontWeight: '600',
                            textAlign: 'center',
                        }}>
                            跳过
                        </Text>
                    </Button>

                    <Button
                        style={{
                            backgroundColor: '#12A575',
                            borderRadius: 100,
                            width: '45%',
                        }}
                        onPress={handleUpdate}
                    >
                        <Text style={{
                            color: '#fff',
                            fontWeight: '600',
                            textAlign: 'center',
                        }}>
                            继续
                        </Text>
                    </Button>
                </Flex>


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


export default FillinApp;
