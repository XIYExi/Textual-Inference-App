import {inject, observer} from "mobx-react";
import React from "react";
import {IDatadashStore} from "../../mobx/datadashStore";
import {View} from "react-native";
import {Text} from "@ant-design/react-native";


interface IProps {
    datadashStore?: IDatadashStore;
}

interface IState {}

@inject('datadashStore')
@observer
class DatadashApp extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }


    render() {

        const {datadashStore} = this.props;

        return (
            <View>
                <Text>Data Dash</Text>
                <Text>{datadashStore?.name}</Text>
            </View>
        )
    }
}


export default DatadashApp;
