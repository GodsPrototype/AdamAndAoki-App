/**
 * Adam & Aoki
 * Subject: HCI
 * Group: CZE
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import IntroSlider from './src/IntroSlider';
import HomeScreen from './src/HomeScreen';
import WeatherScreen from './src/WeatherScreen';
import FamilyScreen from './src/FamilyScreen';
import EditMemberScreen from './src/EditMemberScreen';
import ViewMemberScreen from './src/ViewMemberScreen';
import MainSwipeableScreen from './src/MainSwipeableScreen';
import HelpScreen from './src/HelpScreen';
import {COLOR, ThemeProvider } from 'react-native-material-ui';

const uiTheme = {
  palette: {
    primaryColor: '#3300a6',
    primaryTextColor: COLOR.white
  },
  toolbar: {
    container: {
      height: 50,
    },
  }
}

// Define all the different screens we can navigate to
// TODO: Some of these could be removed, because they are navigated
// to through the Swipeable screen
const RootStack = createStackNavigator(
  {
    Intro: {
      screen: IntroSlider,
      navigationOptions: () => ({
        header: null
      })
    },
    Swipeable: {
      screen: MainSwipeableScreen,
      navigationOptions: () => ({
        header: null
      })
    },
    Home: { screen: HomeScreen },
    Weather: {
      screen: WeatherScreen ,
      navigationOptions: () => ({
        header: null
      })
    },
    Family: { screen: FamilyScreen },
    EditMember: { screen: EditMemberScreen },
    ViewMember: { screen: ViewMemberScreen },
    Help: {
      screen: HelpScreen,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    initialRouteName: 'Intro',
  }
);

// Export the class App, which returns our RootStack component with
// different screens defined, through which our IntroScreen should be the
// first to be initialised
export default class App extends Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <RootStack/>
      </ThemeProvider>
    )
  }
};
