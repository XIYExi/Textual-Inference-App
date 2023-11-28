import React from "react";
import {inject, observer} from "mobx-react";
import {IHomeStore} from "../../mobx/homeStore";
import {Button, Flex, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {Image, StyleSheet} from "react-native";

interface IProps {
    homeStore?: IHomeStore;
}

interface IState {}

@inject('homeStore')
@observer
class HomePageApp extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }


    render(){
        const {homeStore} = this.props;
        return (
            <View>
                <WingBlank>
                    {/*header*/}
                    <Flex style={styles.header} justify="between">
                        <Flex.Item>
                            <Image source={require('../../assets/home/icon.png')} style={styles.icon}/>
                        </Flex.Item>
                        <Flex.Item>
                            <Text style={styles.title}>ChattyAI</Text>
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
                            <Text style={styles.containerCtxPrimary}>欢迎来到</Text>
                            <Text style={styles.containerCtxSecondary}>ChattyAI 👋</Text>
                            <Text style={styles.containerCtxDesc}>
                                现在就开始和ChattyAI聊天吧。
                                你可以问我任何问题。
                            </Text>
                        </View>



                        <Button style={styles.button} activeStyle={{backgroundColor: '#17CE92',opacity: 0.8}}>
                            <Text style={styles.buttonText}>开始使用</Text>
                        </Button>

                    </View>

                </WingBlank>
            </View>

        )
    }
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
        color: '#212121',
        lineHeight: 64,
    },
    hiddenView: {
        width:28,
        height:28,
    },
    container: {
        alignItems: 'center',
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
