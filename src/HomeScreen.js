import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios';

type Props = {};
class HomeScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            UV: null,
            Temp: null
        }
    }

    componentWillUpdate() {
        
    }

    fetchUV() {
        const request = axios.create({
            baseURL: 'https://api.openuv.io/api/v1/uv',
            timeout: 1000,
            // TODO: Get the actual location using geo location
            params: {
                lat: 38.94,
                lng: -105.64
            },
            headers: {'x-access-token': '3bfe269e1ba5271982a206ccafaa8fa3'}
        });

        request.get().then((res) => {
            Alert.alert(res.data.result.uv.toString());
        });
    }

    // TODO: Fetch temperature from Buienradar
    fetchTemp() {
        
    }
    
    render() {
        return(
            <View>
                <Text>
                    HomeScreen
                </Text>
                <Text>

                </Text>
                <Button
                    title="Fetch UV"
                    onPress={this.fetchUV.bind(this)}
                />
                
            </View>
        )
    }
}

export default HomeScreen;