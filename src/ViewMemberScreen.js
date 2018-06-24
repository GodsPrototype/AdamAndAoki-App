import React, {Component} from 'react';
import {View, Text, Linking} from 'react-native';
import {Button, Divider} from 'react-native-material-ui';

class ViewMemberScreen extends Component {
    // Define the function that future screens would have to execute in order
    // to refresh the data on this screen. First, it executes the refresh function
    // for the previous screen. Then, if no data is passed to the function
    // (a sign of a deleted record), do not execute anything else. Otherwise,
    // refresh the member data and reload the component to reflect changes.
    goBackFunction = (member) => {
        this.props.navigation.state.params.beforeBack();
        if(member){
            this.props.navigation.setParams({member});
            this.forceUpdate();
        }
    }

    // Edit button function. It navigates the user to the edit screen.
    edit = () => {
        this.props.navigation.navigate(
            'EditMember',
            {
                id: this.props.navigation.getParam('member').id,
                beforeBack: this.goBackFunction,
                database: this.props.navigation.getParam('database')
            }
        );
    }

    // Send button function. It composes a message to be sent to the family member
    // and redirects the user to WhatsApp to complete the send action.
    send = () => {
        member = this.props.navigation.getParam('member');
        message = 'Hi ' + member.name + '! Make sure to not stay out in the sun for longer than ' + this.formatTime(member.exposure_time) + '.';
        Linking.openURL('whatsapp://send?text=' + message + '&phone=' + member.phone);
    }

    // Formats the sun exposure time to be of a readable format.
    formatTime = (time) => {
        if(time === null){
            return 'no UV threat.';
        }
        hours = Math.trunc(time/60);
        timeString = '';
        if(hours > 0){
            timeString += hours + 'h and ';
        }
        timeString += (time - hours*60) + 'mins';
        return timeString;
    }

    render() {
        const {member} = this.props.navigation.state.params;

        // Formats the skin type to have a readable name instead of code.
        formatSkinType = (skinType) => {
            switch(skinType){
                case "st1":
                    return "Very Light";
                case "st2":
                    return "Light";
                case "st3":
                    return "Light-Medium";
                case "st4":
                    return "Medium";
                case "st5":
                    return "Medium-Dark";
                case "st6":
                    return "Dark";
                default:
                    return "Undefined";
            }
        }

        return(
            <View style={styles.containerStyle}>
                <View>
                    <View importantForAccessibility='yes' style={styles.outputContainerStyle}>
                        <Text style={styles.labelStyle}>Name:</Text>
                        <Text style={styles.textOutputStyle}>{member.name}</Text>
                    </View>
                    <View importantForAccessibility='yes' style={styles.outputContainerStyle}>
                        <Text style={styles.labelStyle}>Phone number:</Text>
                        <Text style={styles.textOutputStyle}>{member.phone}</Text>
                    </View>
                    <View importantForAccessibility='yes' style={styles.outputContainerStyle}>
                        <Text style={styles.labelStyle}>Skin type:</Text>
                        <Text style={styles.textOutputStyle}>{formatSkinType(member.skinType)}</Text>
                    </View>
                </View>
                <Divider />
                <View style={styles.exposureContainerStyle} >
                    <Text style={styles.exposureTitleStyle}>Safe sun exposure time:</Text>
                    <Text style={styles.timeStyle}>{this.formatTime(member.exposure_time)}</Text>
                </View>
                <View style={styles.buttonPanel} >
                    <Button raised disabled={member.phone === null || member.phone === ''} icon="send" text="Notify"
                        onPress={this.send} accessibilityComponentType="button"
                    />
                    <Button raised primary icon="edit" text="Edit"
                        onPress={this.edit} accessibilityComponentType="button"
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    buttonPanel: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    containerStyle: {
        padding: 15
    },
    labelStyle: {
        fontSize: 14,
        color: 'black'
    },
    textOutputStyle: {
        fontSize: 18,
        color: 'black',
        borderColor: 'grey',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'center'
    },
    outputContainerStyle: {
        marginTop: 10,
        marginBottom: 10
    },
    exposureTitleStyle: {
        fontSize: 18,
        color: 'black'
    },
    timeStyle: {
        fontSize: 24,
        color: 'black'
    },
    exposureContainerStyle: {
        padding: 10,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center'
    }
}

export default ViewMemberScreen;
