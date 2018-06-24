import React, {Component} from 'react';
import {View, ViewPagerAndroid} from 'react-native';
import {BottomNavigation} from 'react-native-material-ui';
import DashboardScreen from './DashboardScreen';
import AboutScreen from './AboutScreen';
import FamilyScreen from './FamilyScreen';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);
let db;

// This sccreen is navigated to after the intro sliders are done.
// By default, it will open the Dashboard screen (the first slide).
class MainSwipeableScreen extends Component {
  state = {
    currentPage: "0"
  }

  // The database is opened here, as both the Dashboard and Family screens
  // require access to the database.
  constructor(props){
    super(props);
    db = SQLite.openDatabase(
      {name : 'MemberDB', createFromLocation : '~MemberDB.db'},
      () => {},
      (err) => console.log('### Error: ' + err.message)
    );
  }

  // This makes sure that the database is closed when the app is exited
  componentWillUnmount = () => {
    if (db) {
      db.close(
        () => {},
        (err) => console.log('### Error: ' + err.message)
      );
    }
  }

  // This function is called when another page has been navigated to. It will
  // then update the currentPage state value to the correct value to update
  // any buttons on the bottom navigation
  onPageSelect = e => {
    this.setState({ currentPage: e.nativeEvent.position.toString()})
  }

  // This function is called when a button on the bottom navigation has been pressed
  // so that it can also set the currentPage to the correct position, and use the
  // viewPage reference to set the correct page.
  onNavPress = (pos) => {
    this.setState({ currentPage: pos});
    this.refs.viewPage.setPage(parseFloat(pos));
  }

  // Returns the view pager through which the three screens (Dashboard, Family
  // and About screen) can be swiped through. It also contains the bottom navigation
  // buttons
  render() {
    return (
      <View
        style={styles.swipeScreen}>
        <ViewPagerAndroid
          style={styles.viewPager}
          initialPage={0}
          onPageSelected={this.onPageSelect}
          ref='viewPage'
          >
          <View key="0">
            <DashboardScreen {...this.props} database={db}/>
          </View>
          <View key="1">
            <FamilyScreen {...this.props} database={db}/>
          </View>
          <View key="2">
            <AboutScreen {...this.props}/>
          </View>
        </ViewPagerAndroid>
        <BottomNavigation active={this.state.currentPage} hidden={false}>
          <BottomNavigation.Action
            key="0"
            label="Dashboard"
            icon="dashboard"
            onPress={() => this.onNavPress("0")}
          />
          <BottomNavigation.Action
            key="1"
            label="Family"
            icon="people"
            onPress={() => this.onNavPress("1")}
          />
          <BottomNavigation.Action
            key="2"
            label="About"
            icon="info"
            onPress={() => this.onNavPress("2")}
          />
        </BottomNavigation>
      </View>
    )
  }
}

const styles = {
  swipeScreen: {
    flex: 1
  },
  viewPager: {
    flex: 1
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
  }
}

export default MainSwipeableScreen;
