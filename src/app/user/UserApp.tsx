import {Flex, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {Image, Pressable, StyleSheet, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {IUserStore} from "../../mobx/userStore";
import ThemeText from "../../components/ThemeText";
import ThemeView from "../../components/ThemeView";
import DropDownPicker from 'react-native-dropdown-picker';
import {useThemeContext} from "../../themeContext";
import {changeLanguage, lngKey} from "../../i18n";
import {useTranslation} from "react-i18next";
import {getItem} from "../../utils/asyncStorage";

interface IUserApp {
    userStore: IUserStore;
}

function UserApp(props:IUserApp) {

    const {userStore} = props;
    const themeCtx = useThemeContext();
    const {t} = useTranslation();

    const [modeModalOpen, setModeModalOpen] = useState(false);
    const [modeModalValue, setModeModalValue] = useState('Light');
    const [items, setItems] = useState([
        {label: t('user.lightMode'), value: 'Light'},
        {label: t('user.darkMode'), value: 'Dark'},
    ]);
    const handleModeValueChange = (value:any) => {
        // console.log("mode changed: -> ", value);
        // 只有value发生改变才会出发，如果两次选择相同则不会出发，此回调可以保证值一定被修改
        // value只有两种取值 Light 和 Dark，符合前后端存储规则，可以直接塞到mobx中
        userStore.changeSettingMode(value);
        themeCtx.setMode(value); // 修改上下文，这里是为了给NavigationContainer传值
    }

    useEffect(() => {
       getItem(lngKey).then(res => {
           setLanguageModalValue(res);
        })
    }, [])

    const data = getItem(lngKey).then(res => res)

    const [languageModalOpen, setLanguageModalOpen] = useState(false);
    const [languageModalValue, setLanguageModalValue] = useState<any>();
    const [languageItems, setLanguageItems] = useState([
        {label: '简体中文', value: 'zh'},
        {label: 'English', value: 'en'},
    ])
    const handleLanguageValueChange = async (value: any) => {
        // console.log('language changed: -> ', value);
        await changeLanguage(value);
    }


    // 初始化用于从mobx中提取用户信息并写入到配置中
    useEffect(() => {
        setModeModalValue(userStore.mode);
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
                        <ThemeText style={styles.title}>{t('user.title')}</ThemeText>
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

                <ThemeText style={{marginTop: 24}}>{t('user.setting')}</ThemeText>

                {/*个人信息预览*/}
                <Flex style={styles.settingFlexItem} align='center'>
                    <Image source={
                        userStore.mode === 'Light'
                            ? require('../../assets/user/user_l.png')
                            : require('../../assets/user/user_d.png')
                    } style={styles.settingIcon}/>
                    <ThemeText>{t('user.userinfo')}</ThemeText>
                </Flex>

                {/* i18n国际化 */}
                <Flex justify='between' style={styles.settingFlexItem} align='center'>
                    <Flex>
                        <Image source={
                            userStore.mode === 'Light'
                                ? require('../../assets/user/language_l.png')
                                : require('../../assets/user/language_d.png')
                        } style={styles.settingIcon}/>
                        <ThemeText>{t('user.language')}</ThemeText>
                    </Flex>

                    <DropDownPicker
                        open={languageModalOpen}
                        value={languageModalValue as any}
                        items={languageItems as any}
                        setOpen={setLanguageModalOpen}
                        setValue={setLanguageModalValue}
                        theme={userStore?.mode === 'Light' ? 'LIGHT' : 'DARK'}
                        multiple={false}
                        containerStyle={{
                            width: 150,
                            zIndex: 9999, // 如果两个下拉框同时打开，至少要让上一个遮挡住下一个
                        }}
                        disableBorderRadius={true}
                        onChangeValue={handleLanguageValueChange}
                    />
                </Flex>

                {/*主题色切换 亮色 - 暗色*/}
                <Flex justify='between' style={styles.settingFlexItem} align='center'>
                    <Flex>
                        <Image source={
                            userStore.mode === 'Light'
                                ? require('../../assets/user/mode_l.png')
                                : require('../../assets/user/mode_d.png')
                        } style={styles.settingIcon}/>
                        <ThemeText>{t('user.mode')}</ThemeText>
                    </Flex>

                    <DropDownPicker
                        open={modeModalOpen}
                        value={modeModalValue as any}
                        items={items as any}
                        setOpen={setModeModalOpen}
                        setValue={setModeModalValue}
                        theme={userStore?.mode === 'Light' ? 'LIGHT' : 'DARK'}
                        multiple={false}
                        containerStyle={{
                            width: 150,
                        }}
                        disableBorderRadius={true}
                        onChangeValue={handleModeValueChange}
                    />
                </Flex>

                <WhiteSpace size='xl' />

                <ThemeText>{t('user.about')}</ThemeText>

                {/*帮助中心*/}
                <Flex align='center' style={styles.settingFlexItem}>
                    <Image source={
                        userStore.mode === 'Light'
                            ? require('../../assets/user/help_l.png')
                            : require('../../assets/user/help_d.png')
                    } style={styles.settingIcon}/>
                    <ThemeText>{t('user.help')}</ThemeText>
                </Flex>

                {/*用户须知*/}
                <Flex align='center' style={styles.settingFlexItem}>
                    <Image source={
                        userStore.mode === 'Light'
                            ? require('../../assets/user/locker_l.png')
                            : require('../../assets/user/locker_d.png')
                    } style={styles.settingIcon}/>
                    <ThemeText>{t('user.manual')}</ThemeText>
                </Flex>

                {/*关于*/}
                <Flex align='center' style={styles.settingFlexItem}>
                    <Image source={
                        userStore.mode === 'Light'
                            ? require('../../assets/user/about_l.png')
                            : require('../../assets/user/about_d.png')
                    } style={styles.settingIcon}/>
                    <ThemeText>{t('user.aboutUs')}</ThemeText>
                </Flex>

                {/*注销*/}
                <Flex align='center' style={styles.settingFlexItem}>
                    <Image source={require('../../assets/user/logout.png')} style={styles.settingIcon}/>
                    <Text style={{color: '#F75555'}}>{t('user.logout')}</Text>
                </Flex>

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
    settingFlexItem: {
      marginTop: 15,
    },
    settingIcon: {
        width: 30,
        height: 30,
        marginRight: 12,
    }
});

export default inject('userStore')(observer(UserApp));
