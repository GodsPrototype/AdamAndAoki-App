import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {Toolbar, Avatar, Icon} from 'react-native-material-ui';
import Accordion from '@ercpereda/react-native-accordion';
import FounderCard from './FounderCard';
import menno from './images/menno.jpg';
import nik from './images/nik.jpg';

const storyText = "Hello. We’re ADAM & AOKI, a technology company dedicated to developing next generation smart clothing. We go beyond being a brand. We’re a movement revolutionising the interactions between people and everyday wear. Our innovative clothing range warns users that they are in risk of getting sunburnt. Using specially developed smart fabric, our products detect dangerous UV rays and warn you via a clear colour change. The warning system also takes into account both your skin type and the time it takes you to burn, and doesn’t require phones, apps or electronics. Welcome to clothing 4.0, where functionality meets fashion."
const founderStory1 = "A Dutchman with a wealth of international experience outside having spent 5 years in China and 2 in Turkey & Morocco running production for large global retailers. Knows the nooks and crannies of the fashion business - from design to delivery - and pretty much everything in between."
const founderStory2 = "British born but moved to Amsterdam after the 2012 Olympics where Nik has since mastered Marketing & PR. Spent the last 2 years heading up the communication department at the world's largest digital production, before deciding to leave it all behind and set-up ADAM & AOKI."

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    founderView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start'
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
                <Icon name='keyboard-arrow-up'/> :
                <Icon name='keyboard-arrow-down'/>
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
        <View style={styles.founderHeader}>
            <Text>Our Story</Text>
            {isOpen ?
                <Icon name='keyboard-arrow-up'/> :
                <Icon name='keyboard-arrow-down'/>
            }
        </View>
    </View>;

const headerThree = ({ isOpen }) =>
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
            <Text>Connect with us!</Text>
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
    <View style={styles.founderView}>
        <Text style={{textAlign: 'center', margin: 5}}>
            {storyText}
        </Text>
    </View>
);

const socialContent = (
    <View style={styles.socialView}>
        <TouchableOpacity onPress={() => Linking.openURL('http://www.adamaoki.com/')}>
            <Icon name='public' size={50}/>
            <Text>Website</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('http://www.facebook.com/')}>
            <Icon name='thumb-up' size={50}/>
            <Text>Facebook</Text>
        </TouchableOpacity>
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
                <Accordion
                    header={headerThree}
                    content={socialContent}
                    durection={300}
                />
            </View>
        )
    }
}

export default AboutScreen;
