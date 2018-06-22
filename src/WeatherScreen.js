import React, {Component} from 'react';
import {View, Text, WebView, StyleSheet, Alert} from 'react-native';
import {Toolbar, Card, Subheader, Divider} from 'react-native-material-ui';
import axios from 'axios';

class WeatherScreen extends Component {
  state = {
    uri: null
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
        <Card style={styles.cardStyle}>
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
  },
  cardStyle: {
    flex: 1,
    alignItems: 'center'
  }
});

export default WeatherScreen;
