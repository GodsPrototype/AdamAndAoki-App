import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {Avatar} from 'react-native-material-ui';

class MemberCard extends Component {
  render() {
    const {id, name, initials, image, onPress} = this.props;

    // For testing only. This will actually redirect to the edit/view screen with the member id
    // onPress = () => {
    //   Alert.alert('You pressed on ' + name + ', id: ' + id);
    // }

    // Double view for styling purposes
    return(
        <View>
            <TouchableOpacity onPress={onPress} >
            <View style={styles.viewStyle}>
                <Avatar
                    text={initials}
                    image={{uri: image}}
                    size={85}
                    style={{content: styles.avatatTextStyle}}
                />
                <Text style={styles.textStyle}>{name}</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  viewStyle: {
      flex: 1,
      alignItems: 'center',
      padding: 10
  },
  textStyle: {
      fontSize: 18
  },
  avatatTextStyle: {
      fontSize: 25
  }
});

export default MemberCard;
