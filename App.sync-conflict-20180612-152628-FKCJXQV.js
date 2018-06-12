/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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
import HomeScreen from './src/HomeScreen';
import WeatherScreen from './src/WeatherScreen';
import FamilyScreen from './src/FamilyScreen';
import EditMemberScreen from './src/EditMemberScreen';
import ViewMemberScreen from './src/ViewMemberScreen';

const RootStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Weather: { screen: WeatherScreen },
    Family: { screen: FamilyScreen },
    EditMember: { screen: EditMemberScreen },
    ViewMember: { screen: ViewMemberScreen },
  },
  {
    initialRouteName: 'Home',
  }
);

// type Props = {};
// class App extends Component<Props> {
//   static navigationOptions = {
//     title: 'Welcome',
//   }
//   render() {
//     const {navigate} = this.props.navigation;
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Adam & Aoki
//         </Text>
//         <ActionButton
//           buttonColor="rgba(231,76,60,1)"
//           onPress={() => 
//             navigate('Home')
//           }
//         >

//         </ActionButton>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

export default class App extends Component {
  render() {
    return <RootStack/>;
  }
};