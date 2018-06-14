import React, {Component} from 'react';
import {Text} from 'react-native';
import {Card} from 'react-native-material-ui';

class GaugeComponent extends Component {

    render() {
        const value = this.props.value;
        if (value === null) {
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
        )
    };
}

export default GaugeComponent;
