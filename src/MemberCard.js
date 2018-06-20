import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Card, Avatar} from 'react-native-material-ui';

class MemberCard extends Component {
  render() {
    const {userImage, initialLetter} = this.props;

    if (userImage === null) {
      return (
        <Avatar text={initialLetter} />
      );
    }
    return (
      <Avatar image={userImage} />
    );
  }
}

const styles = StyleSheet.create({

});

export default MemberCard;
