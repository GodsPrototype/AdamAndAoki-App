import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';
//import mennoPic from './menno.png';
//import nikPic from './nik.png';

const styles = StyleSheet.create({
    header: {
        //flex: 1, //makes no difference
        //flexGrow: 1, //makes no difference
        //justifyContent: 'flex-end', //makes no difference
        //alignContent: 'stretch', //this is needed like this
        //padding: 'stretch', //no automatic way works for padding/margin, only constants
        paddingTop: 15,
        //paddingRight: 15,
        //paddingLeft: 15,
        paddingBottom: 15,
        //borderBottomWidth: 1,
        borderBottomColor: '#a93f33',
        backgroundColor: '#3f56f9',
    },
    content: {
        //flex: 1,
        //justifyContent: 'center',
        backgroundColor: '#00d4c2'
    },
    text: {
        //paddingTop: 15,
        //paddingRight: 15,
        //paddingBottom: 15,
        //paddingLeft: 15,
        color: '#5dff59',
    },
    image: {
        //flex:1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    container: {
        //trying to make the height of each header in the column as big as possible
        //flex: 0 , flex makes no difference
        //display: 'flex',  display makes no difference
        backgroundColor: '#fff',
        alignItems: 'stretch', //this is needed like this
        flexGrow: 2, //it works
        //alignSelf: 'stretch', //alignItems already does all we need for this axis
        //alignContent: 'stretch', //alignItems already does all we need for this axis
        justifyContent: 'space-around', //justifyContent makes no difference
        //flexBasis: 80,
    },
    containerHalf : {
        //flex: 1,
        //flexDirection: 'row',
        //flexWrap: 'wrap',
        backgroundColor: '#ffd02a',
        //alignItems: 'stretch',
        //justifyContent: 'flex-start',
        //flexWrap: wrap,
    },
    containerHalfPic : {
        //flex: 1,
        //flexWrap: 'wrap',
        //flexDirection: 'column',
        backgroundColor: '#ffd02a',
        //alignItems: 'stretch',
        //justifyContent: 'flex-start',
        //flexWrap: wrap,
    }
});

class AboutScreen extends Component {
    renderContent() {
        return (
            <View style={styles.containerHalf}>
                <Accordion
                    header={Header21}
                    content={Content21}
                    duration={300}
                />
                <Accordion
                    header={Header22}
                    content={Content22}
                    duration={300}
                />
            </View>);
    }

    render() {
        var inception = this.renderContent();

        return (
            <View style={styles.container}>
                <Accordion
                    header={Header1}
                    content={Content1}
                    duration={300}
                />
                <Accordion
                    header={Header2}
                    content={inception}
                    duration={300}
                />
            </View>
        );
    }
}

const Header1 = ({ isOpen }) =>
    <View style={styles.header}>
        <Text>{`${isOpen ? '-' : '+'} Who we are`}</Text>
    </View>;

const Content1 = (
    <View style={styles.content}>
        <Text style={styles.text}>
            Hello. We’re ADAM & AOKI, a technology company dedicated to developing next generation
            smart clothing. We go beyond being a brand. We’re a movement revolutionising the interactions
            between people and everyday wear.
            Our innovative clothing range warns users that they are in risk of getting sunburnt. Using
            specially developed smart fabric, our products detect dangerous UV rays and warn you via a
            clear colour change. The warning system also takes into account both your skin type and the
            time it takes you to burn, and doesn’t require phones, apps or electronics.
            Welcome to clothing 4.0, where functionality meets fashion.
        </Text>
    </View>);

const Header2 = ({ isOpen }) =>
    <View style={styles.header}>
        <Text>{`${isOpen ? '-' : '+'} Team`}</Text>
    </View>;

const Header21 = ({ isOpen }) =>
    <View style={styles.header}>
        <Text>{`${isOpen ? '-' : '+'} Nik Penhale Smith`}</Text>
    </View>;

const Content21 = (
    <View style={styles.containerHalfPic}>
        <Text style={styles.text}>
            This content is hidden in the accordion
        </Text>
    </View>);
const Header22 = ({ isOpen }) =>
    <View style={styles.header}>
        <Text>{`${isOpen ? '-' : '+'} Menno de Jong`}</Text>
    </View>;

const Content22 = (
    <View style={styles.containerHalfPic}>
        <Text style={styles.text}>
            This content is hidden in the accordion
        </Text>
    </View>);


export default AboutScreen;