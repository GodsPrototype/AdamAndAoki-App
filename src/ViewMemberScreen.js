import React, {Component} from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import {Button, Divider} from 'react-native-material-ui';

class ViewMemberScreen extends Component {
    goBackFunction = (member) => {
        this.props.navigation.state.params.beforeBack();
        if(member){
            this.props.navigation.setParams({member});
            this.forceUpdate();
        }
    }

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

    send = () => {
        Linking.openURL('whatsapp://send?text=hello&phone=' + this.props.navigation.getParam('member').phone);
    }

    render() {
        const {member} = this.props.navigation.state.params;

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

        formatTime = (time) => {
            if(time === null){
                return "no UV threat.";
            }
            hours = Math.trunc(time/60);
            timeString = '';
            if(hours > 0){
                timeString += hours + 'h and ';
            }
            timeString += (time - hours*60) + 'mins';
            return timeString;
        }

        return(
            <View style={styles.containerStyle}>
                <View>
                    <Text style={styles.labelStyle}>Name:
                        <Text style={styles.textStyle}>{member.name}</Text>
                    </Text>
                    <Text style={styles.labelStyle}>Initials:
                        <Text style={styles.textStyle}>{member.initials}</Text>
                    </Text>
                    <Text style={styles.labelStyle}>Phone number:
                        <Text style={styles.textStyle}>{member.phone}</Text>
                    </Text>
                    <Text style={styles.labelStyle}>Skin type:
                        <Text style={styles.textStyle}>{formatSkinType(member.skinType)}</Text>
                    </Text>
                </View>
                <Divider style={{container: styles.dividerStyle}} />
                <View>
                    <Text style={styles.labelStyle}>Safe sun exposure time: {formatTime(member.exposure_time)}</Text>
                </View>
                <Divider style={{container: styles.dividerStyle}} />
                <View style={styles.buttonPanel} >
                    <Button raised disabled={member.phone === ''} icon="send" text="Send"
                        onPress={this.send}
                    />
                    <Button raised primary icon="edit" text="Edit"
                        onPress={this.edit}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  buttonPanel: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  containerStyle: {
      padding: 15
  },
  textStyle: {
      fontSize: 20
  },
  dividerStyle: {
      marginTop: 5,
      marginBottom: 5
  },
  labelStyle: {
      fontSize: 16
  }
})

export default ViewMemberScreen;
