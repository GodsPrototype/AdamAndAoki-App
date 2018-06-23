import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Avatar} from 'react-native-material-ui';

class MemberCard extends Component {
  render() {
    const {member, onPress} = this.props;

    formatTime = () => {
        time = member.exposure_time;
        if(time === null || time > 24*60){
            return member.initials;
        }
        hours = Math.trunc(time/60);
        timeString = hours + ':';
        timeString += time - hours*60;
        return timeString;
    }

    return(
        <View style={styles.containerStyle}>
            <TouchableOpacity onPress={onPress} accessibilityComponentType="button" >
            <View style={styles.viewStyle}>
                <Avatar
                    text={formatTime()}
                    image={<Image source={{uri: member.image}} />}
                    size={80}
                    style={{content: styles.avatarTextStyle}}
                />
                <Text style={styles.textStyle}>{member.name}</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        margin: 10
    },
    viewStyle: {
        flex: 1,
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 18
    },
    avatarTextStyle: {
        fontSize: 25
    }
});

export default MemberCard;
