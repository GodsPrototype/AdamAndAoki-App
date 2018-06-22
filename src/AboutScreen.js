import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Toolbar, ListItem, Icon} from 'react-native-material-ui';
import Accordion from '@ercpereda/react-native-accordion';
import FounderCard from './FounderCard';
import menno from './images/menno.jpg';
import nik from './images/nik.jpg';

const storyText = "Hello. We’re ADAM & AOKI, a technology company dedicated to developing next generationsmart clothing. We go beyond being a brand. We’re a movement revolutionising the interactionsbetween people and everyday wear. Our innovative clothing range warns users that they are in risk of getting sunburnt. Usingspecially developed smart fabric, our products detect dangerous UV rays and warn you via a clear colour change. The warning system also takes into account both your skin type and thetime it takes you to burn, and doesn’t require phones, apps or electronics.Welcome to clothing 4.0, where functionality meets fashion."


const styles = StyleSheet.create({
  founderView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  founderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const headerOne = ({ isOpen }) =>
  <View style={{
      paddingTop: 15,
      paddingRight: 15,
      paddingLeft: 15,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#a9a9a9',
      backgroundColor: '#f9f9f9',
    }}>
    <View style={styles.founderHeader}>
      <Text>Founders</Text>
      {isOpen ?
        <Icon name='keyboard-arrow-down'/> :
        <Icon name='keyboard-arrow-up'/>
      }
    </View>
  </View>;

const headerTwo = ({ isOpen }) =>
  <View style={{
      paddingTop: 15,
      paddingRight: 15,
      paddingLeft: 15,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#a9a9a9',
      backgroundColor: '#f9f9f9',
    }}>
      <Text>{`${isOpen ? '-' : '+'} Our Story`}</Text>
    </View>;

const founderContent = (
    <View style={styles.founderView}>
      <FounderCard image={menno} story="I am founder 1"/>
      <FounderCard image={nik} story="I am founder 2"/>
    </View>
);

const aboutUsContent = (
    <View style={styles.founderView}>
      <Text>
        {storyText}
      </Text>
    </View>
);

class AboutScreen extends Component {
  render() {
    return(
      <View>
        <Toolbar centerElement="About Us"/>
        <Accordion
          header={headerOne}
          content={founderContent}
          durection={300}
        />
        <Accordion
          header={headerTwo}
          content={aboutUsContent}
          durection={300}
        />
      </View>
    )
  }
}

export default AboutScreen;
