import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Toolbar} from 'react-native-material-ui';

class AboutScreen extends Component {
    render() {
        return(
            <View>
              <Toolbar centerElement="About Us" />
            </View>
        )
    }
}

export default AboutScreen;
