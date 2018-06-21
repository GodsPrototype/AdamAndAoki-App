import React, {Component} from 'react';
import {View, Text, WebView, StyleSheet} from 'react-native';
import {Toolbar} from 'react-native-material-ui';

class WeatherScreen extends Component {
  state = {
    uri: null
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude.toFixed(2);
      const long = pos.coords.longitude.toFixed(2);

      let url = "https://gadgets.buienradar.nl/gadget/zoommap/?lat=" + lat.toString() + "&lng=" + long.toString() + "&overname=2&zoom=13";
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
