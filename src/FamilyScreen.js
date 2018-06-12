import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ActionButton from 'react-native-action-button';
import EditMemberScreen from './EditMemberScreen';
import ViewMemberScreen from './ViewMemberScreen';

class FamilyScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return(
            <View>
                <Text>
                    FamilyScreen
                </Text>
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => navigate('EditMember')}
                    >
                </ActionButton>
            </View>
        )
    }
}

export default FamilyScreen;