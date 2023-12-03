import {Text, View} from "@ant-design/react-native";
import {Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import Lottie from 'lottie-react-native';
import {useNavigation} from "@react-navigation/native";
import Onboarding from 'react-native-onboarding-swiper';
import {setItem} from "../../../utils/asyncStorage";

const {width, height} = Dimensions.get('window');

function IntroductionApp() {

    const navigation = useNavigation();

    const doneButton = ({...props})=>{
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>完成</Text>
            </TouchableOpacity>
        )
    }

    const skipButton =  ({...props})=>{
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>跳过</Text>
            </TouchableOpacity>
        )
    }

    const nextButton =  ({...props})=>{
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>下一步</Text>
            </TouchableOpacity>
        )
    }

    const handleDone = async () => {

        await setItem('introduction', '1');
        //@ts-ignore
        navigation.navigate('Welcome');
    }

    return (
        <View style={styles.container}>
            <Onboarding
                bottomBarHighlight={false}
                DoneButtonComponent={doneButton}
                SkipButtonComponent={skipButton}
                NextButtonComponent={nextButton}
                onSkip={handleDone}
                onDone={handleDone}
                containerStyles={{paddingHorizontal: 15}}
                pages={[
                    {
                        backgroundColor: '#a7f3d0',
                        image:(
                            <View style={styles.lottie1}>
                                <Lottie source={require('../../../assets/welcome/wel1.json')} autoPlay loop/>
                            </View>
                        ) ,
                        title: '智能AI写作助手解放你的双手',
                        subtitle: '使用预构建的自然语言理解模型，解析理解传递文档内容，这款应用可以帮助提高写作效率。',
                    },
                    {
                        backgroundColor: '#fef3c7',
                        image:(
                            <View style={styles.lottie2}>
                                <Lottie source={require('../../../assets/welcome/wel2.json')} autoPlay loop/>
                            </View>
                        ) ,
                        title: '生成式机器阅读理解拓展你的思维',
                        subtitle: '跳出文本的束缚，在模型理解文本的基础上，生成答案，通过对话问答的形式获得想要的内容。',
                    },
                    {
                        backgroundColor: '#a78bfa',
                        image:(
                            <View style={styles.lottie3}>
                                <Lottie source={require('../../../assets/welcome/wel3.json')} autoPlay loop/>
                            </View>
                        ) ,
                        title: '多端多平台使用',
                        subtitle: '应用登录IOS，Android，PC，可以尝试官网API调用服务。',
                    },
                ]}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: -40
    },
    lottie1: {
        width: width* 0.9,
        height: height * 0.43,
    },
    lottie2: {
        width: width* 0.9,
        height: height * 0.5,
    },
    lottie3: {
        width: width* 0.9,
        height: height * 0.45,
    },
    doneButton: {
        padding: 20,
        // backgroundColor: 'white',
        // borderTopLeftRadius: '100%',
        // borderBottomLeftRadius: '100%'
    }
})


export default IntroductionApp;
