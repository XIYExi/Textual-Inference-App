import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {IHomeStore} from "../../mobx/homeStore";
import {Button, Flex, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {Image, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {IUserStore} from "../../mobx/userStore";
import {useThemeContext} from "../../themeContext";
import ThemeView from "../../components/ThemeView";
import ThemeText from "../../components/ThemeText";

interface IHomePageApp {
    userStore: IUserStore;
}

function HomePageApp(props: IHomePageApp) {

    const navigation = useNavigation();

    return (
        <ThemeView>
            <WingBlank>
                {/*header*/}
                <Flex style={styles.header} justify="between">
                    <Flex.Item>
                        <Image source={require('../../assets/home/icon.png')} style={styles.icon}/>
                    </Flex.Item>
                    <Flex.Item>
                        <ThemeText style={styles.title}>ChattyAI</ThemeText>
                    </Flex.Item>
                    <Flex.Item>
                        {/*标题最后占位用的div块，用于flex-between局部将title居中*/}
                        <View style={styles.hiddenView}/>
                    </Flex.Item>
                </Flex>

                {/*container*/}
                <View style={styles.container}>

                    <WhiteSpace size='xl'/>
                    <Image source={require('../../assets/home/bigIcon.png')} style={styles.containerIcon}/>
                    <View style={styles.containerCtx}>
                        <ThemeText style={styles.containerCtxPrimary}>欢迎来到</ThemeText>
                        <ThemeText style={styles.containerCtxSecondary}>ChattyAI 👋</ThemeText>
                        <ThemeText style={styles.containerCtxDesc}>
                            现在就开始和ChattyAI聊天吧。
                            你可以问我任何问题。
                        </ThemeText>
                    </View>

                    <Button
                        style={styles.button}
                        activeStyle={{backgroundColor: '#17CE92',opacity: 0.8}}
                        onPress={() => {
                            // console.log('hello')
                            // @ts-ignore
                            navigation.navigate('Main')
                        }}
                    >
                        <ThemeText style={styles.buttonText}>开始使用</ThemeText>
                    </Button>

                </View>

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
        width:28,
        height:28,
    },
    container: {
        alignItems: 'center',
        height: '100%',
    },
    containerIcon: {
        width: 140,
        height: 140,
    },
    containerCtx: {
        marginTop: 30,
        marginBottom: 30,
    },
    containerCtxPrimary: {
        textAlign: 'center',
        fontSize: 36,
        fontWeight: '600',
        lineHeight: 50,
        fontStyle: 'normal',
        color: '#212121',
    },
    containerCtxSecondary: {
        textAlign: 'center',
        color: '#17CE92',
        fontSize: 36,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 52,
    },
    containerCtxDesc: {
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        fontStyle: 'normal',
        letterSpacing: 0.2,
        lineHeight: 28.8,
        maxWidth: '60%',
        marginTop: 30,
    },
    button: {
        width: '100%',
        borderRadius: 100,
        backgroundColor: '#17CE92',
        alignSelf: 'stretch',
        gap: 10,
        borderWidth: 0,
    },
    buttonText: {
        fontSize: 18,
        fontStyle: 'normal',
        textAlign: 'center',
        letterSpacing: 0.2,
        fontWeight: '400',
        color: '#FFFFFF',
        opacity: 1,
    }
})


export default HomePageApp;
