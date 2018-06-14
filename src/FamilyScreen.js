import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ActionButton} from 'react-native-material-ui';
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
                  onPress={() =>
                    navigate('Swipeable')
                  }
                >
                </ActionButton>
            </View>
        )
    }
}

export default FamilyScreen;
