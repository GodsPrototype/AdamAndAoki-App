import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ActionButton} from 'react-native-material-ui';
import EditMemberScreen from './EditMemberScreen';
import ViewMemberScreen from './ViewMemberScreen';
import MemberCard from './MemberCard';
import SQLite from 'react-native-sqlite-storage';

class FamilyScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;

        // TODO: Use Sqlite, and load users from there
        return(
            <View>
                <Text>
                    FamilyScreen
                </Text>

                <MemberCard userImage={null} initialLetter='A' />
                <MemberCard userImage={null} initialLetter='M' />
                <MemberCard userImage={null} initialLetter='L' />
                <ActionButton
                  onPress={() =>
                    navigate('EditMember')
                  }
                >
                </ActionButton>
            </View>
        )
    }
}

export default FamilyScreen;
