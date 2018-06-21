import React, {Component} from 'react';
import {View, Text, WebView, StyleSheet, Alert} from 'react-native';
import {Toolbar} from 'react-native-material-ui';
import axios from 'axios';

class WeatherScreen extends Component {
  state = {
    uri: null,

  }

  fetchWeatherData() {

    navigator.geolocation.getCurrentPosition((pos) => {
      let lat = pos.coords.latitude.toFixed(5);
      let long = pos.coords.longitude.toFixed(5);

      const request = axios.create({
        baseURL: "http://samples.openweathermap.org/data/2.5/forecast",
        timeout: 1000,
        params: {
          lat: lat,
          lon: long,
          APPID: 'cd88704cd0416236441a1a1a7e9d6b31'
        }
      });

      request.get().then((res) => {

      })
    }, (err) => {
      Alert.alert(err.toString());
    });
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((pos) => {
      let lat = pos.coords.latitude.toFixed(5);
      let long = pos.coords.longitude.toFixed(5);

      let url = "https://gadgets.buienradar.nl/gadget/zoommap/?lat=" + lat.toString() + "&lng=" + long.toString() + "&overname=2&zoom=13&size=2b&voor=1";
      console.log(url);
      this.setState({ uri: url});
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <Toolbar
          style={{flex: 1}}
          centerElement="Weather"
        />
        <WebView
          source={{uri: this.state.uri}}
          style={styles.weatherMap}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  weatherMap: {
    width: 256,
    maxHeight: 256
  }
});

export default WeatherScreen;
