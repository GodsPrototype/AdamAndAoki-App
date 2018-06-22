import React, {Component} from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Card} from 'react-native-material-ui';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

class UVGaugeComponent extends Component {

  checkSpinner(value) {
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
        <Card>
          <View style={styles.view}>
            <Text style={styles.text}>{Math.round(value)}</Text>
            <AnimatedGaugeProgress
              size={200}
              width={15}
              fill={(value/11)*100}
              rotation={90}
              cropDegree={90}
              tintColor="#4682b4"
              backgroundColor="#b0c4de" />
            <Text>UV Index</Text>
          </View>
        </Card>
      )
    }
  }

  render() {
      const {value} = this.props;
      return this.checkSpinner(value);
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

export default UVGaugeComponent;
