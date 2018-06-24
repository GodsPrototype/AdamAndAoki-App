import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {Toolbar, Avatar, Icon, Card} from 'react-native-material-ui';
import Accordion from '@ercpereda/react-native-accordion';
import FounderCard from './FounderCard';
import menno from './images/menno.jpg';
import nik from './images/nik.jpg';

const storyText = "Hello. We’re ADAM & AOKI, a technology company dedicated to developing next generation smart clothing. We go beyond being a brand. We’re a movement revolutionising the interactions between people and everyday wear. Our innovative clothing range warns users that they are in risk of getting sunburnt. Using specially developed smart fabric, our products detect dangerous UV rays and warn you via a clear colour change. The warning system also takes into account both your skin type and the time it takes you to burn, and doesn’t require phones, apps or electronics. Welcome to clothing 4.0, where functionality meets fashion."
const founderStory1 = "A Dutchman with a wealth of international experience outside having spent 5 years in China and 2 in Turkey & Morocco running production for large global retailers. Knows the nooks and crannies of the fashion business - from design to delivery - and pretty much everything in between."
const founderStory2 = "British born but moved to Amsterdam after the 2012 Olympics where Nik has since mastered Marketing & PR. Spent the last 2 years heading up the communication department at the world's largest digital production, before deciding to leave it all behind and set-up ADAM & AOKI."

const styles = {
    founderView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start'
    },
    aboutUsView: {
        flex: 1,
        margin: 10
    },
    socialView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'flex-start'
    },
    founderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textStyle: {
        fontSize: 18,
        color: 'black'
    },
    cardContent: {
        margin: 10,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainer: {
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#a9a9a9',
        backgroundColor: '#f9f9f9',
    },
    storyStyle: {
      textAlign: 'justify',
      margin: 5,
      color: 'black'
    },
    headerText: {
      color: 'black'
    }
};

const headerOne = ({ isOpen }) =>
    <View style={styles.headerContainer}>
        <View style={styles.founderHeader}>
            <Text style={styles.textStyle}>Founders</Text>
            {isOpen ?
                <Icon name='keyboard-arrow-up'/> :
                <Icon name='keyboard-arrow-down'/>
            }
        </View>
    </View>;

const headerTwo = ({ isOpen }) =>
    <View style={styles.headerContainer}>
        <View style={styles.founderHeader}>
            <Text style={styles.textStyle}>Our Story</Text>
            {isOpen ?
                <Icon name='keyboard-arrow-up'/> :
                <Icon name='keyboard-arrow-down'/>
            }
        </View>
    </View>;

const headerThree = ({ isOpen }) =>
    <View style={styles.headerContainer}>
        <View style={styles.founderHeader}>
            <Text style={styles.textStyle}>Connect with us!</Text>
            {isOpen ?
                <Icon name='keyboard-arrow-up'/> :
                <Icon name='keyboard-arrow-down'/>
            }
        </View>
    </View>;

const founderContent = (
    <View style={styles.founderView}>
        <FounderCard image={menno} name="Menno de Jong" title="Founder & Head of Production" story={founderStory1}/>
        <FounderCard image={nik} name="Nik Penhale Smith" title="Founder & CEO" story={founderStory2}/>
    </View>
);

const aboutUsContent = (
    <View style={styles.aboutUsView}>
        <Card>
            <View style={styles.aboutUsView}>
                <Text style={styles.storyStyle}>
                    {storyText}
                </Text>
            </View>
        </Card>
    </View>
);

const socialContent = (
    <View style={styles.socialView}>
        <TouchableOpacity onPress={() => Linking.openURL('http://www.adamaoki.com/')}>
            <Card>
                <View style={styles.cardContent}>
                    <Icon name='public' size={50}/>
                    <Text style={styles.headerText}>Website</Text>
                </View>
            </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('http://www.facebook.com/')}>
            <Card>
                <View style={styles.cardContent}>
                    <Icon name='thumb-up' size={50}/>
                    <Text style={styles.headerText}>Facebook</Text>
                </View>
            </Card>
        </TouchableOpacity>
    </View>
);

class AboutScreen extends Component {
    render() {
        return(
            <ScrollView>
                <View>
                    <Toolbar centerElement="About Us"/>
                    <Accordion
                          header={headerOne}
                          content={founderContent}
                          duration={300}
                      />
                    <Accordion
                          header={headerTwo}
                          content={aboutUsContent}
                          duration={300}
                      />
                    <Accordion
                          header={headerThree}
                          content={socialContent}
                          duration={300}
                      />
                </View>
            </ScrollView>
        )
    }
}

export default AboutScreen;
