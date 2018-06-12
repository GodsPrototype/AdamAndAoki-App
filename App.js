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
import ActionButton from 'react-native-action-button';
import {createStackNavigator} from 'react-navigation';
import IntroScreen from './src/IntroScreen';
import HomeScreen from './src/HomeScreen';
import WeatherScreen from './src/WeatherScreen';
import FamilyScreen from './src/FamilyScreen';
import EditMemberScreen from './src/EditMemberScreen';
import ViewMemberScreen from './src/ViewMemberScreen';
import MainSwipeableScreen from './src/MainSwipeableScreen';


// Define all the different screens we can navigate to
// TODO: Some of these could be removed, because they are navigated
// to through the Swipeable screen
const RootStack = createStackNavigator(
  {
    Intro: { screen: IntroScreen },
    Swipeable: { screen: MainSwipeableScreen },
    Home: { screen: HomeScreen },
    Weather: { screen: WeatherScreen },
    Family: { screen: FamilyScreen },
    EditMember: { screen: EditMemberScreen },
    ViewMember: { screen: ViewMemberScreen },
  },
  {
    initialRouteName: 'Intro',
  }
);

// Export the class App, which returns our RootStack component with
// different screens defined, which should go to the Intro screen
// first
export default class App extends Component {
  render() {
    return <RootStack/>;
  }
};