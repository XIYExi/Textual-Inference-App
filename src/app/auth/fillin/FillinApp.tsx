import {Button, Flex, ImagePicker, Text, Toast, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import React, {Dispatch, SetStateAction, useState} from "react";
import {ActivityIndicator, Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet} from "react-native";
import Input from "../../../components/Input";
import {useNavigation} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {port} from "../../../utils/port";


/**
 * 完善个人信息页面，直接跳过则使用默认信息
 * @constructor
 */
function FillinApp(props: any) {

    const {userId} = props.route.params;

    const [name, setName] = useState('');
    const navigation = useNavigation();
    const [phone, setPhone] = useState('');
    const [occupation, setOccupation] = useState('');
    const [sex, setSex] = useState('');
    const [address, setAddress] = useState('');

    const handleUpdate = () => {
        // TODO 更新用户数据
        //  这一步无论是skip还是continue都必须到Login页面，用户必须登录，不然获取不到theme mode信息

        handleFillInFetch();
    }

    const handleFillInFetch = async () => {
        await fetch(`${port}/auth/fillin`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                id: userId,
                name: name,
                phone: phone,
                occupation: occupation,
                sex: sex,
                address: address,
            }),
        })
            .then((response:any) => response.json())
            .then((data:any) => {
                const {res} = data.data;
                console.log(data)

                if (res.error)
                    Toast.info({
                        content: (<Text style={{color: '#fff'}}>{res.error}</Text>),
                        duration: 2,
                        stackable: false,
                    })
                else{
                    //@ts-ignore
                    navigation.navigate('Login');
                }
            })
            .catch(err => {
                console.log(`【用户信息更新异常】 -> ${err}`);
            })
    }

    const {t} = useTranslation();

    return (
        <View style={styles.login}>
            <WhiteSpace size='xl' />
            <WhiteSpace size='xl' />
            <WingBlank style={{flex: 1}}>

                <Text style={styles.title}>{t('fill.title')}📋</Text>
                <Text style={styles.subTitle}>{t('fill.subtitle')}</Text>

                <ScrollView style={{marginTop: 20, flex: 1, marginBottom: 20,}}>
                    <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>


                    <Flex justify='center'>
                        {/*TODO 预览和上传头像*/}
                        <ImagePicker />
                    </Flex>

                    <Input
                        label={t('fill.username')}
                        style={[styles.input]}
                        onChangeText={(text:string) => setName(text)}
                    />
                    <Input
                        label={t('fill.phone')}
                        style={[styles.input]}
                        onChangeText={(text:string) => setPhone(text)}
                    />
                    <Input
                        label={t('fill.occupation')}
                        style={[styles.input]}
                        onChangeText={(text:string) => setOccupation(text)}
                    />

                    <Input
                        label={t('fill.sex')}
                        style={[styles.input]}
                        onChangeText={(text:string) => setSex(text)}
                    />

                    <Input
                        label={t('fill.address')}
                        style={[styles.input]}
                        onChangeText={(text:string) => setAddress(text)}
                    />
                    </KeyboardAvoidingView>
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
                            navigation.navigate('Login')
                        }}
                    >
                        <Text style={{
                            color: '#12A575',
                            fontWeight: '600',
                            textAlign: 'center',
                        }}>
                            {t('fill.skip')}
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
                            {t('fill.continue')}
                        </Text>
                    </Button>
                </Flex>


            </WingBlank>
        </View>
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
