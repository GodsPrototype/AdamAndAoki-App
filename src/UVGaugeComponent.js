import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {Card} from 'react-native-material-ui';
import { AnimatedGaugeProgress } from 'react-native-simple-gauge';

class UVGaugeComponent extends Component {

  // This function will receive a value (the value to be shown on the gauge)
  // and generate either a ActivityIndicator/ Spinner to indicate that it is
  // loading information on the background, IF the value is null
  // Otherwise, it will correctly render the gauge with the value
  checkSpinner(value) {
    if (value === null) {
      return(
        <Card>
          <View style={styles.view}>
            <ActivityIndicator size="large"/>
            <Text style={styles.cardSubtext}>UV Index</Text>
          </View>
        </Card>
      )
    } else {
      return (
        <View style={styles.container}>
          <Card>
            <View style={styles.view}>
              <Text style={styles.text}>{Math.round(value)}</Text>
              <AnimatedGaugeProgress
                size={200}
                width={15}
                fill={(value/11)*100}
                rotation={90}
                cropDegree={90}
                tintColor="#C47D00"
                backgroundColor="#D4D17A" />
              <Text style={styles.cardSubtext}>UV Index</Text>
            </View>
          </Card>
        </View>
      )
    }
  }

  render() {
    const {value} = this.props;
    return this.checkSpinner(value);
  };
}

const styles = {
  container: {
    width: 300
  },
  view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  text: {
    position: 'absolute',
    fontSize: 24
  },
  cardSubtext: {
    fontSize: 18
  },
}

export default UVGaugeComponent;
