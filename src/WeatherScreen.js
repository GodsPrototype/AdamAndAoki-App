import React, {Component} from 'react';
import {View, WebView} from 'react-native';
import {Toolbar, Card, Subheader, Divider} from 'react-native-material-ui';

class WeatherScreen extends Component {
  state = {
    uri: null,
    list: null
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.createURI();
  }

  createURI() {
    let lat = this.props.navigation.state.params.lat;
    let long = this.props.navigation.state.params.lng;

    let url = "https://gadgets.buienradar.nl/gadget/zoommap/?lat=" + lat.toString() + "&lng=" + long.toString() + "&overname=2&zoom=13&size=2b&voor=1";
    this.setState({ uri: url});
  }

  render() {
    return(
      <View style={styles.container}>
        <Toolbar
          leftElement="arrow-back"
          style={styles.toolbarStyle}
          centerElement="Weather"
          onLeftElementPress={() => this.props.navigation.goBack()}
        />
        <Card>
          <View style={styles.cardContentView}>
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
          <View style={styles.weatherTableContainer}>
            <Subheader style={styles.subheaderStyle} text="Weather Forecast"/>
            <WebView
              source={{uri: "https://gadgets.buienradar.nl/gadget/forecastandstation/6260"}}
              style={styles.weatherTable}
            />
          </View>
        </Card>
      </View>
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
