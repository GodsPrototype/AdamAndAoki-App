import React, {Component} from 'react';
import {View, Text, WebView, StyleSheet, Alert} from 'react-native';
import {Toolbar, Card, Subheader, Divider} from 'react-native-material-ui';
import axios from 'axios';

class WeatherScreen extends Component {
  state = {
    uri: null,
    list: null
  }

  constructor(props) {
    super(props);
    this.createURI();
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    const request = axios.create({
      baseURL: 'http://api.openweathermap.org/data/2.5/forecast',
      timeout: 1000,
      params: {
        lat: this.props.navigation.state.params.lat,
        lon: this.props.navigation.state.params.lng,
        APPID: 'cd88704cd0416236441a1a1a7e9d6b31'
      }
    });

    request.get().then((res) => {
      this.setState({
        list: res.data.list.slice(0, 5)
      });
    }).catch((err) => {
      Alert.alert(err.toString());
    });
  }

  createURI() {
    let lat = this.props.navigation.state.params.lat;
    let long = this.props.navigation.state.params.lng;

    let url = "https://gadgets.buienradar.nl/gadget/zoommap/?lat=" + lat.toString() + "&lng=" + long.toString() + "&overname=2&zoom=13&size=2b&voor=1";
    console.log(url);
    this.setState({ uri: url});
  }

  render() {
    return(
      <View style={styles.container}>
        <Toolbar
          style={{flex: 1}}
          centerElement="Weather"
        />
        <Card>
          <Subheader text="Weather Radar" />
          <View style={{ height: 256}}>
            <WebView
              source={{uri: this.state.uri}}
              style={styles.weatherMap}
            />
          </View>
        </Card>
        <Divider/>
        <Card>
          <Subheader text="Weather Forecast"/>
          <WebView
            source={{uri: "https://gadgets.buienradar.nl/gadget/forecastandstation/6260"}}
            style={styles.weatherTable}
          />
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    width: 300,
    maxHeight: 190
  }
});

export default WeatherScreen;
