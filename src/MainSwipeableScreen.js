import React, {Component} from 'react';
import {View, Text, ViewPagerAndroid} from 'react-native';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import FamilyScreen from './FamilyScreen';


type Props = {};
class MainSwipeableScreen extends Component<Props> {
    render() {
        return (
            <ViewPagerAndroid
                style={styles.viewPager}
                initialPage={0}>
                <View key="0">
                    <HomeScreen/>
                </View>
                <View key="1">
                    <FamilyScreen/>
                </View>
                <View key="2">
                    <AboutScreen/>
                </View>
            </ViewPagerAndroid>
        )
    }
}

const styles = {
    viewPager: {
        flex: 1
    },
    pageStyle: {
        alignItems: 'center',
        padding: 20,
    }
}

export default MainSwipeableScreen;