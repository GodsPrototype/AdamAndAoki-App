import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';
import {Card} from 'react-native-material-ui';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

class GaugeComponent extends Component {

    render() {
        const {value, openWeather} = this.props;

        return (
          <Card onPress={() => openWeather()}>
            <View style={styles.view}>
              <Text style={styles.text}>{Math.round(value)}</Text>
              <AnimatedGaugeProgress
                size={200}
                width={15}
                fill={(value/40)*100}
                rotation={90}
                cropDegree={90}
                tintColor="#4682b4"
                backgroundColor="#b0c4de" />
            </View>
          </Card>
        )
    };
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    position: 'absolute'
  },
  cardStyle: {

  }
});

export default GaugeComponent;
