/* This is the Dashboard screen, where we can see the two UV and Temperature
  It makes use of OpenUV and OpenWeather API for fetching UV and temperature inforamtion
*/

import React, {Component} from 'react';
import {View, Alert, ScrollView} from 'react-native';
import {Toolbar} from 'react-native-material-ui';
import axios from 'axios';
import UVGaugeComponent from './UVGaugeComponent';
import TempGaugeComponent from './TempGaugeComponent';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);
let db;

const helpText = "This screen allows you to check on:\n1. The UV Index at your current location\n2. The Weather at your current location\nPress on the weather meter to see more weather information";

class DashboardScreen extends Component {
    // The Dashboard screen contains the state for the UV, Temperature,
    // exposure times recommendations for different skin types fetched from the API
    // as well as the latitude, longitude from the device's GPS
    state = {
        uv: null,
        temp: null,
        recommendations: null,
        lat: null,
        lng: null
    }

    // Defining the SQLite Database
    constructor(props) {
        super(props);
        db = this.props.database;
    }

    // When this screen loads, it will get location, and then using the lat and long
    // values, it will fetch the local UV index and temperature
    componentDidMount() {
        this.getLocation();
    }

    // Fetched lat and long from device GPS and calls fetchUV and fetchTemp functions
    getLocation() {
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude.toFixed(5);
            const long = pos.coords.longitude.toFixed(5);

            this.setState({
                lat: lat,
                lng: long
            });

            this.fetchUV();
            this.fetchTemp();

        }, (err) => {
            // Error alert to screen if GPS request was unsuccessful
            Alert.alert(err.toString());
        });
    }

    // SQL methods

    // A callback function in case of a failed SQLite query
    errorCB = (err) => {
      console.log('### Error: ' + err.message)
      return false;
    }

    // A callback function in case of a successful SQLite query
    successCB = () => {
      // Console logs have been commented out for performance reasons
      // console.log('### Success')
    }

    // This function updates the recommended exposure times in the SQLite Database
    updateExposureTimes = () => {
      db.transaction((tx) => {
        rec = this.state.recommendations;

        for (let k in rec) {
          tx.executeSql(
            'UPDATE ExposureTime SET exposureTime = ? WHERE skinType = ?',
            [rec[k], k],
            this.successCB,
            this.errorCB
          );
        }
      })
    }

    // This functino checks what button on the top right menu has been clicked on
    // be it either 'Refresh' or 'Help'. Refresh will refresh the UV and temp data.
    // Help will open a help screen for the dashboard
    handleMenuClick = (e) => {
        const i = e.index;
        if (i === 0) {
          this.fetchUV();
          this.fetchTemp();
        } else if (i === 1) {
          this.props.navigation.navigate('Help', { text: helpText});
        }
    }

    // This uses the current GPS data to fetch and update UV index
    fetchUV() {
        const request = axios.create({
            baseURL: 'https://api.openuv.io/api/v1/uv',
            timeout: 1000,
            params: {
                lat: this.state.lat,
                lng: this.state.lng
            },
            headers: {'x-access-token': '3bfe269e1ba5271982a206ccafaa8fa3'}
        });

        request.get().then((res) => {
            this.setState({
                uv: res.data.result.uv,
                recommendations: res.data.result.safe_exposure_time
            });
            this.updateExposureTimes();
        }).catch((err) => {
            Alert.alert(err.toString());
        });
    }

    // THis uses the current GPS data to fetch and update the weather data
    fetchTemp() {
        const request = axios.create({
            baseURL: 'http://api.openweathermap.org/data/2.5/weather',
            timeout: 1000,
            params: {
                lat: this.state.lat,
                lon: this.state.lng,
                APPID: 'cd88704cd0416236441a1a1a7e9d6b31'
            }
        });

        request.get().then((res) => {
            this.setState({
                // Converting from Kelvin to Celsius, and setting state
                temp: res.data.main.temp - 272
            });
        }).catch((err) => {
            console.log(err);
            Alert.alert(err.toString());
        });
    }

    // This function will navigate to the Weather screen if the temperature
    // gauge has been pressed
    openWeather() {
        const {navigate} = this.props.navigation;
        navigate('Weather', {lat: this.state.lat, lng: this.state.lng});
    }

    // Simple render function containing the two main gauges to be shown
    render() {
        return(
            <ScrollView>
                <View>
                <Toolbar centerElement="Dashboard" rightElement={{menu: { labels: ['Refresh', 'Help']}}} onRightElementPress={(e) => this.handleMenuClick(e)}/>
                <View style={styles.container}>
                    <UVGaugeComponent value={this.state.uv}  />
                    <TempGaugeComponent openWeather={this.openWeather.bind(this)} value={this.state.temp} />
                </View>
                </View>
            </ScrollView>
        );
    }
}

// Styling defined here
const styles = {
    container: {
        alignItems: 'center',
        marginTop: 20
    }
}

export default DashboardScreen;
