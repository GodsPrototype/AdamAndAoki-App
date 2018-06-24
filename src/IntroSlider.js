import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 'screen1',
    title: 'UV Index',
    text: 'Too much UV is bad\n\nCheck the UV Index at your location regularly\nto limit daily UV exposure',
    image: require('./images/baseline_wb_sunny_black_48dp.png'),
    backgroundColor: '#3300a6',
  },
  {
    key: 'screen1',
    title: 'Check the Weather',
    text: 'Check the local weather forecast and weather radar',
    image: require('./images/baseline_wb_cloudy_black_48dp.png'),
    backgroundColor: '#3300a6',
  },
  {
    key: 'screen1',
    title: 'Warn your Family',
    text: "Track and notify family members and their UV exposure\nYou can send personal recommendations based on skin type\nand the current UV Index",
    image: require('./images/baseline_people_black_48dp.png'),
    backgroundColor: '#3300a6',
  }
];

class IntroSlider extends React.Component {

  onDone = () => {
    this.props.navigation.navigate('Swipeable');
  }

  render() {

    return(
      <AppIntroSlider
        slides={slides}
        onDone={this.onDone}
      />
    )
  }
}

export default IntroSlider;
