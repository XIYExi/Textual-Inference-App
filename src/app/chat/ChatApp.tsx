import ChannelScreenApp from "./ChannelScreenApp";
import {Image, Pressable, SafeAreaView, StyleSheet} from "react-native";
import {useHeaderHeight} from "@react-navigation/elements";
import {useAttachmentPickerContext} from "stream-chat-react-native";
import {useAppContext} from "../../AppContext";
import React, {Component, useEffect} from "react";
import {IChatStore} from "../../mobx/chatStore";
import {inject, observer} from "mobx-react";
import {Flex, Modal, View, WingBlank, Text, Button, WhiteSpace} from "@ant-design/react-native";
import Loading from "./component/loading";


const ChannelScreen = (props:any) => {
    const headerHeight = useHeaderHeight();
    const {setTopInset} = useAttachmentPickerContext();

    useEffect(() => {
        setTopInset(headerHeight);
    }, [headerHeight]);

    return (
        <SafeAreaView>
            <ChannelScreenApp channelId={props.channelId}/>
        </SafeAreaView>
    )
}


interface IProps {
    chatStore: IChatStore;
    [key:string]:any;
}
interface IState {}

@inject('chatStore')
@observer
class ChatApp extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }


    handleOpenAddon = () => {
        this.props.chatStore.changeOpenAddon()
    }

    render() {

        const {chatStore} = this.props;
        const {id} = this.props.route.params;

        return (
            <WingBlank style={styles.wrapper}>

                <ChannelScreen channelId={id}/>

                <Loading loading={chatStore.loading} />

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

                                {/*配置上传按钮*/}
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
        )
    }
}


const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        position: 'relative',
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
        marginTop: 10,
    },
    uploadFileTitle: {
        marginLeft: 6,
    }
})

export default ChatApp;
