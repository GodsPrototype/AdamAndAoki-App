import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {Card, Icon} from 'react-native-material-ui';
import { AnimatedGaugeProgress} from 'react-native-simple-gauge';

class TempGaugeComponent extends Component {

  // This function will receive a value (the value to be shown on the gauge)
  // and generate either a ActivityIndicator/ Spinner to indicate that it is
  // loading information on the background, IF the value is null
  // Otherwise, it will correctly render the gauge with the value.

  // The difference between the UV and Temp gauge component is that the temp
  // gauge component needs to be clickable to open weather. This function (openWeather)
  // is passed down as a prop from the parent component
  checkSpinner(value, openWeather) {
    if (value === null) {
      return(
        <Card>
          <View style={styles.view}>
            <ActivityIndicator size="large"/>
            <Text style={styles.cardSubtext}>Temperature</Text>
          </View>
        </Card>
      )
    } else {
      return (
        <View style={styles.container}>
          <Card onPress={() => openWeather()}>
            <View style={styles.view}>
              <Text style={styles.text}>{Math.round(value) + "°C"}</Text>
              <AnimatedGaugeProgress
                size={200}
                width={15}
                fill={(value/40)*100}
                rotation={90}
                cropDegree={90}
                tintColor="#9F111B"
                backgroundColor="#F5A2A2" />
              <Text style={styles.cardSubtext}>Temperature</Text>
            </View>
            <Icon style={styles.icon} name='info'/>
          </Card>
        </View>
      )
    }
  }

    render() {
        const {value, openWeather} = this.props;
        return this.checkSpinner(value, openWeather);
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
  icon: {
    position: 'absolute',
    margin: 5
  }
}

export default TempGaugeComponent;
