import {Flex, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {Image, Pressable, StyleSheet, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {IUserStore} from "../../mobx/userStore";
import ThemeText from "../../components/ThemeText";
import ThemeView from "../../components/ThemeView";
import DropDownPicker from 'react-native-dropdown-picker';

interface IUserApp {
    userStore: IUserStore;
}

function UserApp(props:IUserApp) {

    const {userStore} = props;

    const [modeModalOpen, setModeModalOpen] = useState(false);
    const [modeModalValue, setModeModalValue] = useState(['Light']);
    const [items, setItems] = useState([
        {label: '明亮模式', value: 'Light'},
        {label: '黑暗模式', value: 'Dark'},
    ]);

    useEffect(() => {
        setModeModalValue([userStore.mode]);
    }, [userStore])


    return (
        <ThemeView style={{ flex: 1}}>
            <WingBlank>
                {/*header*/}
                <Flex style={styles.header} justify="between">
                    <Flex.Item>
                        <Image source={require('../../assets/home/icon.png')} style={styles.icon}/>
                    </Flex.Item>
                    <Flex.Item>
                        <ThemeText style={styles.title}>账户</ThemeText>
                    </Flex.Item>
                    <Flex.Item>
                        {/*标题最后占位用的div块，用于flex-between局部将title居中*/}
                        <View style={styles.hiddenView}/>
                    </Flex.Item>
                </Flex>

                {/*头像和昵称*/}
                <Flex>
                    <Image source={require('../../assets/user/avatar.png')} style={styles.avatar}/>

                    <View style={{marginLeft: 14}}>
                        <ThemeText style={styles.userTitle}>{userStore?.name}</ThemeText>
                        <ThemeText style={styles.userEmail}>{userStore?.email}</ThemeText>
                    </View>
                </Flex>

                <ThemeText style={{marginTop: 24}}>设置</ThemeText>

                <Flex>
                    <Image source={require('../../assets/user/user.png')} />
                    <ThemeText>个人信息</ThemeText>
                </Flex>

                <Flex>
                    <Image source={require('../../assets/user/language.png')} />
                    <ThemeText>语言</ThemeText>
                    <ThemeText>{userStore?.language}</ThemeText>
                </Flex>

                <Flex justify='between'>
                    <Flex>
                        <Image source={require('../../assets/user/language.png')} />
                        <ThemeText>模式</ThemeText>
                    </Flex>
                    <ThemeText style={styles.showSetting}>{userStore?.mode}</ThemeText>

                    <DropDownPicker
                        open={modeModalOpen}
                        value={modeModalValue as any}
                        items={items as any}
                        setOpen={setModeModalOpen}
                        setValue={setModeModalValue}
                        theme={userStore?.mode === 'Light' ? 'LIGHT' : 'DARK'}
                        multiple={false}
                    />
                </Flex>

                <ThemeText>关于</ThemeText>

                <WhiteSpace size='xl' />
            </WingBlank>

        </ThemeView>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
    },
    icon: {
        width: 28,
        height: 28
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 64,
    },
    hiddenView: {
        width: 28,
        height: 28,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    userTitle: {
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 20,
    },
     userEmail: {
         fontStyle: 'normal',
         fontSize: 14,
         fontWeight: '400',
         lineHeight: 22.4,
         letterSpacing: 0.2,
     },
    showSetting: {
        marginRight: 10,
    },
    modal: {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    modalTitle: {
        fontSize: 26,
        fontWeight: '600',
        fontStyle: 'normal',
        color: 'rgba(0,0,0,0.8)',
    },
});

export default inject('userStore')(observer(UserApp));
