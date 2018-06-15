import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-material-ui';

class GaugeComponent extends Component {

    render() {
        const {value, openWeather, key} = this.props;

        if (value === null || key === false) {
            if (value === false) {
                return(
                    <Card>
                        <Text>No Data</Text>
                    </Card>
                );
            }
            return(
                <Card>
                    <Text>{value}</Text>
                </Card>
            );
        }

        return(
            <Card onPress={() => openWeather()}>
                <Text>{value}</Text>
            </Card>
        );
    };
}

const styles = StyleSheet.create({

});

export default GaugeComponent;
