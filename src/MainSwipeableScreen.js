import React, {Component} from 'react';
import {View, ViewPagerAndroid} from 'react-native';
import {BottomNavigation} from 'react-native-material-ui';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import FamilyScreen from './FamilyScreen';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);
let db;


type Props = {};
class MainSwipeableScreen extends Component<Props> {
  state = {
    currentPage: "0"
  }

  componentWillMount = () => {
    console.log('### Opening database...');
    db = SQLite.openDatabase(
      {name : 'MemberDB', createFromLocation : '~MemberDB.db'},
      () => console.log('### Done.'),
      (err) => console.log('### Error: ' + err.message)
    );
  }

  componentWillUnmount = () => {
    if (db) {
      console.log('### Closing database...');
      db.close(
        () => console.log('### Done.'),
        (err) => console.log('### Error: ' + err.message)
      );
    } else {
      console.log('### Database was not opened');
    }
  }

  onPageSelect = e => {
    this.setState({ currentPage: e.nativeEvent.position.toString()})
  }

  onNavPress = (pos) => {
    this.setState({ currentPage: pos});
    this.refs.viewPage.setPage(parseFloat(pos));
  }

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
                    <HomeScreen {...this.props} database={db}/>
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
