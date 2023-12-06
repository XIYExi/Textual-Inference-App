import {Modal, Text} from "@ant-design/react-native";
import {inject, observer} from "mobx-react";
import {StyleSheet} from "react-native";
import ThemeText from "../../components/ThemeText";
import {IUserStore} from "../../mobx/userStore";

interface IModeModal {
    userStore: IUserStore;
    modeModal: boolean;
    handleShowModeModal: () => void;
}


function ModeModal(props: IModeModal) {

    const {userStore, modeModal, handleShowModeModal} = props;

    console.log(props.userStore)

    return (
        <></>
    )
}

const styles = StyleSheet.create({

})


export default inject('userStore')(observer(ModeModal));
