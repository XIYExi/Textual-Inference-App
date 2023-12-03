import {useMessageInputContext, useTheme} from "stream-chat-react-native";
import {StyleSheet, TouchableOpacity} from "react-native";
import {View} from "@ant-design/react-native";
import {Camera} from "../../components/Camera";


const styles = StyleSheet.create({
    attachButtonContainer: {paddingHorizontal: 5},
});

function InputButton() {

    const {
        giphyActive,
        hasCommands,
        hasFilePicker,
        hasImagePicker,
        toggleAttachmentPicker,
    } = useMessageInputContext();

    const {
        theme: {
            colors: {grey},
            messageInput: {attachButtonContainer},
        },
    } = useTheme();

    if (giphyActive) {
        return null;
    }

    return (
        <>
            {(hasImagePicker || hasFilePicker) && (
                <View
                    style={[
                        hasCommands ? styles.attachButtonContainer : undefined,
                        attachButtonContainer,
                    ]}>
                    <TouchableOpacity onPress={toggleAttachmentPicker}>
                        <Camera width={21} pathFill={grey} />
                    </TouchableOpacity>
                </View>
            )}
        </>
    )
}

export default InputButton;
