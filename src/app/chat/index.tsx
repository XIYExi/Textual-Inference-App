import React, {useState} from "react";
import {Button, Flex, InputItem, Modal, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {inject, observer} from "mobx-react";
import {IChatStore} from "../../mobx/chatStore";
import {Image, StyleSheet, Button as RnButton, Pressable} from "react-native";

interface IProps {
    chatStore: IChatStore;
}

interface IState {
    open: boolean;
}



@inject('chatStore')
@observer
class ChatApp extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
    }

    handleOpenAddon = () => {
        this.props.chatStore.changeOpenAddon()
    }

    render() {
        const {chatStore} = this.props;
        return (
            <View>
                <WingBlank style={styles.wrapper}>
                    {/*header*/}
                    <Flex style={styles.header} justify="between">
                        <Flex.Item>
                            <Image source={require('../../assets/chat/back.png')} style={styles.backIcon}/>
                        </Flex.Item>
                        <Flex.Item>
                            <Text style={styles.title}> ChattyAI</Text>
                        </Flex.Item>
                        <Flex.Item>
                            <View style={styles.hiddenView}/>
                        </Flex.Item>
                    </Flex>
                    <Button onPress={this.handleOpenAddon}>Open</Button>
                    <Text>{chatStore.name}</Text>


                    {/*输入框和button按钮*/}
                    <Flex style={styles.inputWrapper} align='center'>
                        <View style={styles.inputs}>
                            <InputItem
                                onChange={(value: any) => {}}
                                placeholder="问我任何事..."
                                type='text'
                            />
                        </View>
                        <Button style={styles.button} activeStyle={{backgroundColor: '#17CE92',opacity: 0.8}}>
                            <Image
                                source={require('../../assets/chat/submit.png')}
                                style={styles.submitIcon}
                            />
                        </Button>
                    </Flex>

                    <Modal
                        popup
                        visible={chatStore.openAddon}
                        animationType="slide-up"
                        onClose={this.handleOpenAddon}
                        style={styles.modal}
                    >
                        <WingBlank>
                            <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>

                                <Flex justify='between' align='center'>
                                    <Text style={styles.modalTitle}>
                                        配置
                                    </Text>

                                    <Pressable onPress={() => chatStore.changeOpenAddon()}>
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
                                                source={require('../../assets/chat/close.png')}
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                }}
                                            />
                                        </View>
                                    </Pressable>
                                </Flex>


                                <View style={styles.itemWrapper}>
                                    <Text style={styles.secondTitle}>
                                        附件上传
                                    </Text>
                                    <Text style={styles.secondDesc}>
                                        可以上传doc文档，在AI阅读理解的基础上进行问答或写作，支持多文本解析。
                                    </Text>

                                    {/*文件预览列表*/}
                                    <View style={styles.uploadList}>
                                        {
                                            chatStore.uploadList.length === 0
                                            ? (<View />)
                                            : (chatStore.uploadList.map((item, index) => (
                                                <View style={[styles.uploadFileWrapper, {}]} key={index}>
                                                    {/*文件预览部分*/}
                                                    <View style={{width: '100%', zIndex: 100}}>
                                                        <Flex align='center' justify='start'>
                                                            <Image
                                                                source={require('../../assets/chat/file.png')}
                                                                style={{width: 24, height: 24}}
                                                            />
                                                            <Text style={styles.uploadFileTitle}>{item.title}</Text>
                                                        </Flex>
                                                    </View>

                                                    <Button
                                                        onPress={() => chatStore.removeUploadList(item.id)}
                                                        style={{
                                                            position: 'absolute',
                                                            right: 0,
                                                            borderWidth: 0,
                                                            borderRadius: 12,
                                                            zIndex: 100,
                                                        }}
                                                        activeStyle={false}
                                                        activeOpacity={1}
                                                    >
                                                        <Image
                                                            source={require('../../assets/chat/delete.png')}
                                                            style={{
                                                                width: 14,
                                                                height: 18,
                                                                opacity: 0.8,
                                                            }}
                                                        />
                                                    </Button>

                                                </View>)
                                            ))
                                        }
                                    </View>


                                    {/*上传按钮*/}
                                    <View style={styles.uploadButtonWrapper}>
                                        <Button
                                            activeStyle={false}
                                            onPress={() => chatStore.addUploadList()}
                                            style={{ borderRadius: 16 }}
                                        >
                                            <Image source={require('../../assets/chat/upload.png')} style={styles.uploadIcon}/>
                                        </Button>
                                    </View>
                                </View>

                                <Text>配图</Text>
                            </View>
                            <Button type="primary" onPress={this.handleOpenAddon}>
                                修改配置
                            </Button>

                            <WhiteSpace size='xl'/>
                        </WingBlank>
                    </Modal>

                </WingBlank>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        position: 'relative',
    },
    header: {
        padding: 10,
    },
    backIcon: {
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
    inputWrapper: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginBottom: 24,
    },
    inputs: {
        width: '80%',
        backgroundColor: 'rgba(158, 158,158, 0.1)',
        borderRadius: 16,
        gap: 12,
        alignItems: 'center',
    },
    buttonWrapper: {
        width: '20%',
    },
    button: {
        width: 52,
        height: 52,
        borderRadius: 100,
        backgroundColor: '#17CE92',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginLeft: 10,
    },
    submitIcon: {
        width: 24,
        height: 24,
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
    itemWrapper: {
        marginTop: 30,
        backgroundColor: 'rgba(158, 158,158, 0.15)',
        padding: 20,
        borderRadius: 18,
    },
    secondTitle: {
        fontSize: 18,
        fontWeight: '500',
        fontStyle: 'normal',
        color: 'rgba(0, 0, 0, 0.8)',
    },
    secondDesc: {
        fontWeight: '400',
        fontStyle: 'normal',
        marginTop: 8,
    },
    uploadButtonWrapper: {
        marginTop: 20,
    },
    uploadList: {
        marginTop: 20,
        width: '100%',
    },
    uploadIcon: {
        width: 20,
        height: 20,
    },
    uploadFileWrapper: {
        backgroundColor: '#ffffff',
        padding: 12,
        width: '100%',
        borderRadius: 16,
        zIndex: 10,
        position: 'relative',
    },
    uploadFileTitle: {
        marginLeft: 6,
    }
})

export default ChatApp;
