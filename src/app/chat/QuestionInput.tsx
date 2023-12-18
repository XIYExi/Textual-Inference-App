import {StyleSheet, TextInput} from "react-native";
import {View} from "@ant-design/react-native";


function QuestionInput() {


    return (
        <>
            <View style={{marginTop: 16, marginBottom: 16}} >
                <TextInput
                    style={styles.inputStyles}
                    autoComplete='off'
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType={'default'}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    inputStyles: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#12A575',
        borderRadius: 6,
        fontSize: 14,
        fontWeight: "500",
        color: "#323643",
        height: 48,
    }
})


export default QuestionInput;
