import {Button, Carousel, Flex, Text, View, WingBlank} from "@ant-design/react-native";
import {StyleSheet} from "react-native";
import {useState} from "react";
import IntroductionPage1App from "./IntroductionPage1App";
import IntroductionPage2App from "./IntroductionPage2App";
import IntroductionPage3App from "./IntroductionPage3App";

function IntroductionApp() {

    const [page, setPage] = useState(0); // page only in [1, 2, 3]


    return (
        <View style={{position: 'relative', height: '100%'}}>
            <View style={styles.content}>
                <Carousel
                    style={{
                        width: '100%',
                        height: 520,
                    }}
                    selectedIndex={page}
                    autoplay={false}
                    infinite={false}
                    dotStyle={{
                        width: 20,
                        marginRight: 5,
                        marginLeft: 5,
                    }}
                    dotActiveStyle={{
                        backgroundColor: '#17CE92',
                    }}
                >
                    <IntroductionPage1App />
                    <IntroductionPage2App />
                    <IntroductionPage3App />
                </Carousel>
            </View>

            <View style={styles.footer}>
                <Flex justify='center' align='center'>
                    <Button style={[styles.btn, {
                        backgroundColor: '#E8FAF4',
                        marginRight: 20
                    }]}>
                        <Text style={[styles.btnText, {
                            color: '#17CE92'
                        }]}>跳过</Text>
                    </Button>
                    <Button style={[styles.btn, {backgroundColor: '#17CE92'}]}>
                        <Text style={[styles.btnText, {
                            color: '#fff'
                        }]}>下一步</Text>
                    </Button>
                </Flex>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    content: {
        width: '100%',

    },
    footer: {
        width: '100%',
        position:'absolute',
        bottom: 0,
        left: 0,
        paddingTop: 24,
        paddingBottom: 36,
    },
    btn:{
        width: '45%',
        borderRadius: 100,
        borderWidth: 0,
        paddingRight: 16,
        paddingLeft: 16,
        gap: 10,
        textAlign: 'center',
        justifyContent: 'center',
    },
    btnText: {
        textAlign: 'center',
        fontStyle: 'normal',
    },
})


export default IntroductionApp;
