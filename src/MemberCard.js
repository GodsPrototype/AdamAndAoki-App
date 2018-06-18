import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Avatar} from 'react-native-material-ui';

class MemberCard extends Component {
  render() {
    const {name, initials, image, onPress} = this.props;

    // Double view for styling purposes
    return(
        <View>
            <TouchableOpacity onPress={onPress} >
            <View style={styles.viewStyle}>
                <Avatar
                    text={initials}
                    image={<Image source={{uri: image}} />}
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
