import React, {Component} from 'react';
import {View, WebView, ScrollView} from 'react-native';
import {Toolbar, Card, Subheader, Divider} from 'react-native-material-ui';

// This screen shows the weather radar and forecast for the user's current location
class WeatherScreen extends Component {
  // State only holds the custom URI for fetching the weather radar
  state = {
    uri: null
  }

  constructor(props) {
    super(props);
  }

  // When the component has mounted, then the URI will be constructed and
  // the WebView will update itself to contain the weather radar
  componentDidMount() {
    this.createURI();
  }

  // Creates a custom url to get the weather radar for the current location
  createURI() {
    // Receives lat and long as parameters from the parent component (Dashboard)
    let lat = this.props.navigation.state.params.lat;
    let long = this.props.navigation.state.params.lng;

    let url = "https://gadgets.buienradar.nl/gadget/zoommap/?lat=" + lat.toString() + "&lng=" + long.toString() + "&overname=2&zoom=13&size=2b&voor=1";
    this.setState({ uri: url});
  }

  render() {
    return(
      <ScrollView>
        <View style={styles.container}>
          <Toolbar
            leftElement="arrow-back"
            style={styles.toolbarStyle}
            centerElement="Weather"
            onLeftElementPress={() => this.props.navigation.goBack()}
          />
          <Card>
            <View accessible accessibilityLabel="This shows a weather radar for the next three hours" style={styles.cardContentView}>
              <Subheader style={styles.subheaderStyle}  text="Weather Radar" />
              <View style={styles.webViewContainer}>
                <WebView
                  source={{uri: this.state.uri}}
                  style={styles.weatherMap}
                />
              </View>
            </View>
          </Card>
          <Divider/>
          <Card>
            <View accessible accessibilityLabel="This table shows the weather forecast for this week" style={styles.weatherTableContainer}>
              <Subheader style={styles.subheaderStyle} text="Weather Forecast"/>
              <WebView
                source={{uri: "https://gadgets.buienradar.nl/gadget/forecastandstation/6260"}}
                style={styles.weatherTable}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    )
  }
}

const styles = {
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  weatherMap: {
    width: 256,
    maxHeight: 256
  },
  weatherTable: {
    width: 300
  },
  cardContentView: {
    margin: 10
  },
  weatherTableContainer: {
    height: 240,
    margin: 10
  },
  subheaderStyle: {
    text: {
      fontSize: 18
    }
  },
  webViewContainer: {
    height: 256
  }
}

export default WeatherScreen;
