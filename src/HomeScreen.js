import React, {Component} from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';
import {Toolbar} from 'react-native-material-ui';
import axios from 'axios';
import UVGaugeComponent from './UVGaugeComponent';
import TempGaugeComponent from './TempGaugeComponent';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);
let db;

type Props = {};
class HomeScreen extends Component<Props> {
    // State for homescreen is only uv and temp, which is initialised as null
    state = {
        uv: null,
        temp: null,
        recommendations: null,
        lat: null,
        lng: null
    }

    constructor(props) {
        super(props);
        db = this.props.database;
    }

    componentDidMount() {
        this.getLocation();
    }

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
            Alert.alert(err.toString());
        });
    }

    // SQL methods
    errorCB = (err) => {
        console.log('### Error: ' + err.message)
        return false;
    }

    successCB = () => {
        console.log('### Done.');
    }

    updateExposureTimes = () => {
      db.transaction((tx) => {
        console.log('### Updating...');
        rec = this.state.recommendations;

        for (let k in rec) {
          tx.executeSql(
            'UPDATE exposuretimes SET exposure_time = ? WHERE skin_type = ?',
            [rec[k], k],
            this.successCB,
            this.errorCB
          );
        }
      })
    }

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

    openWeather() {
        const {navigate} = this.props.navigation;
        navigate('Weather', {lat: this.state.lat, lng: this.state.lng});
    }

    render() {
        return(
            <View>
              <Toolbar centerElement="Dashboard" />
              <UVGaugeComponent value={this.state.uv}  />
              <TempGaugeComponent openWeather={this.openWeather.bind(this)} value={this.state.temp} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default HomeScreen;
