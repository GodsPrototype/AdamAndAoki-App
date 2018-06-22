import React, {Component} from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Card} from 'react-native-material-ui';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

class TempGaugeComponent extends Component {

  checkSpinner(value, openWeather) {
    if (value === null) {
      return(
        <Card>
          <View style={styles.view}>
            <ActivityIndicator size="large"/>
            <Text>Temperature</Text>
          </View>
        </Card>
      )
    } else {
      return (
        <Card onPress={() => openWeather()}>
          <View style={styles.view}>
            <Text style={styles.text}>{Math.round(value) + "°C"}</Text>
            <AnimatedGaugeProgress
              size={200}
              width={15}
              fill={(value/40)*100}
              rotation={90}
              cropDegree={90}
              tintColor="#4682b4"
              backgroundColor="#b0c4de" />
            <Text>Temperature</Text>
          </View>
        </Card>
      )
    }
  }

    render() {
        const {value, openWeather} = this.props;
        return this.checkSpinner(value, openWeather);
    };
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  text: {
    position: 'absolute'
  }
});

export default TempGaugeComponent;
