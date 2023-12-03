import {Flex, View, WhiteSpace} from "@ant-design/react-native";
import {Image, StyleSheet} from "react-native";


function IntroductionPage1App(){

    return(
        <View>

            <WhiteSpace size='xl'/>

            <View>
                <Flex justify='center' align='center' direction='column'>
                    <Image source={require('../../../assets/welcome/wel1.png')} style={styles.image}/>
                </Flex>
                <View style={styles.modal}></View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 400,
        height: 580,
        flexShrink: 0,
    },
    modal: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'linearGradient(44deg, #FFFFFF 68%,#FCF8F8 100%)',
        zIndex: 9999,
        width: '100%',
        height: 180,
    }
})

export default IntroductionPage1App;
