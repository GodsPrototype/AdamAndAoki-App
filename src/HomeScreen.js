import React, {Component} from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';
// import {Card} from 'react-native-material-ui';
import axios from 'axios';
import GaugeComponent from './GaugeComponent';

type Props = {};
class HomeScreen extends Component<Props> {
    // State for homescreen is only uv and temp, which is initialised as null
    state = {
        uv: null,
        temp: null
    }

    componentWillMount() {
        this.fetchUV();
        this.fetchTemp();
    }

    fetchUV() {
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const long = pos.coords.longitude;

            const request = axios.create({
                baseURL: 'https://api.openuv.io/api/v1/uv',
                timeout: 1000,
                params: {
                    lat: lat,
                    lng: long
                },
                headers: {'x-access-token': '3bfe269e1ba5271982a206ccafaa8fa3'}
            });

            request.get().then((res) => {
                this.setState({
                    uv: res.data.result.uv
                })
            }).catch((error) => {
                Alert.alert(error.toString());
            });
        }, (err) => {
            Alert.alert(err.toString());
        });
    }

    // TODO: Fetch temperature from Buienradar
    fetchTemp() {
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const long = pos.coords.longitude;

            const request = axios.create({
                baseURL: 'http://api.openweathermap.org/data/2.5/weather',
                timeout: 1000,
                // TODO: Get the actual location using geo location
                params: {
                    lat: lat,
                    lon: long,
                    APPID: 'cd88704cd0416236441a1a1a7e9d6b31'
                }
            });

            request.get().then((res) => {
                this.setState({
                    // Converting from Kelvin to Celsius, and setting state
                    temp: res.data.main.temp - 272
                });
            }).catch((err) => {
                Alert.alert(err.toString());
            });
        })
    }

    render() {
        return(
            <View>
                <Text style={styles.title}>HomeScreen</Text>
                <GaugeComponent value={this.state.uv} />
                <GaugeComponent value={this.state.temp} />
                <Button
                    onPress={this.fetchUV.bind(this)}
                    title="Fetch UV"
                />
                <Button
                    onPress={this.fetchTemp.bind(this)}
                    title="Fetch Temp"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HomeScreen;
