import {Component} from "react";
import {Text, View} from "@ant-design/react-native";
import {Pressable, StyleSheet, TextInput} from "react-native";


export default class Input extends Component<any, any> {
    state = {
        toggleSecure: false,
    };


    renderLabel() {
        const {label, error} = this.props;
        //console.log('input label error: ->', error)

        return (
            <View>
                {
                    label ? (
                        <Text style={{
                            color: error ? "#F3534A" : "#C5CCD6",
                        }}>
                            {label}
                        </Text>
                    ) : null
                }
            </View>
        )
    }

    renderToggle() {
        const {secure, rightLabel} = this.props;
        const {toggleSecure} = this.state;

        if (!secure) return null;

        return (
            <Pressable
                onPress={() => this.setState({ toggleSecure: !toggleSecure })}
            >
                <View style={styles.toggle}>
                    {rightLabel ? (
                        rightLabel
                    ) : null}
                </View>
            </Pressable>
        );
    }

    renderRight() {
        const { rightLabel, rightStyle, onRightPress } = this.props;

        if (!rightLabel) return null;

        return (
            <Pressable onPress={() => onRightPress && onRightPress()}>
                <View style={[styles.toggle, rightStyle]}>
                    {rightLabel}
                </View>
            </Pressable>
        );
    }

    render() {
        const {email, phone, number, secure, error, style, ...props} = this.props;
        const {toggleSecure} = this.state;
        const isSecure = toggleSecure ? false : secure;

        const inputStyles = [
            styles.input,
            error && {borderColor: "#F3534A"},
            style,
        ];

        const inputType = email
            ? "email-address"
            : number
            ? "numeric"
            : phone
            ? "phone-pad"
            : "default";

        return (
            <View style={{marginTop: 16, marginBottom: 16}} >
                {this.renderLabel()}
                <TextInput
                    style={inputStyles}
                    secureTextEntry={isSecure}
                    autoComplete='off'
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType={inputType}
                    {...props}
                />
                {this.renderToggle()}
                {this.renderRight()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#12A575',
        borderRadius: 6,
        fontSize: 14,
        fontWeight: "500",
        color: "#323643",
        height: 48,
    },
    toggle: {
        position: "absolute",
        alignItems: "flex-end",
        width: 32,
        height: 32,
        top: 16,
        right: 0
    },
})
