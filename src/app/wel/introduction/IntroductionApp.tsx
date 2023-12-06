import {Text, View} from "@ant-design/react-native";
import {Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import Lottie from 'lottie-react-native';
import {useNavigation} from "@react-navigation/native";
import Onboarding from 'react-native-onboarding-swiper';
import {setItem} from "../../../utils/asyncStorage";
import {useTranslation} from "react-i18next";

const {width, height} = Dimensions.get('window');

function IntroductionApp() {
    const {t} = useTranslation();
    const navigation = useNavigation();

    const doneButton = ({...props})=>{
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>{t('wel.intro.complete')}</Text>
            </TouchableOpacity>
        )
    }

    const skipButton =  ({...props})=>{
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>{t('wel.intro.skip')}</Text>
            </TouchableOpacity>
        )
    }

    const nextButton =  ({...props})=>{
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>{t('wel.intro.next')}</Text>
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
                        title: t('wel.intro.anim1.title'),
                        subtitle: t('wel.intro.anim1.subtitle'),
                    },
                    {
                        backgroundColor: '#fef3c7',
                        image:(
                            <View style={styles.lottie2}>
                                <Lottie source={require('../../../assets/welcome/wel2.json')} autoPlay loop/>
                            </View>
                        ) ,
                        title: t('wel.intro.anim2.title'),
                        subtitle: t('wel.intro.anim2.subtitle'),
                    },
                    {
                        backgroundColor: '#a78bfa',
                        image:(
                            <View style={styles.lottie3}>
                                <Lottie source={require('../../../assets/welcome/wel3.json')} autoPlay loop/>
                            </View>
                        ) ,
                        title: t('wel.intro.anim3.title'),
                        subtitle: t('wel.intro.anim3.title'),
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
