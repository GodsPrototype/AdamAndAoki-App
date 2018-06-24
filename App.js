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
import DashboardScreen from './src/DashboardScreen';
import WeatherScreen from './src/WeatherScreen';
import FamilyScreen from './src/FamilyScreen';
import EditMemberScreen from './src/EditMemberScreen';
import ViewMemberScreen from './src/ViewMemberScreen';
import MainSwipeableScreen from './src/MainSwipeableScreen';
import HelpScreen from './src/HelpScreen';
import {COLOR, ThemeProvider } from 'react-native-material-ui';

// App.js is the root of our app, where the navigation and theming is defined

// UI theme allows us to choose styling to be used throughout the entire app
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

// Using a stack navigator, we define which screens can be navigated through using
// this.props.navigation in others screens
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
    Dashboard: { screen: DashboardScreen },
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
  // Our initial screen is the intro slider, as defined here
  {
    initialRouteName: 'Intro',
  }
);

// Export the class App, which returns our RootStack component with
// different screens defined. It is wrapped in the ThemeProvider so that we
// can maintain a consistent style throughout the application.
export default class App extends Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <RootStack/>
      </ThemeProvider>
    )
  }
};
