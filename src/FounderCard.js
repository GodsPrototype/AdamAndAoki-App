import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import {Card, Avatar} from 'react-native-material-ui';

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: 50,
        resizeMode: 'contain',
        flexShrink: 2,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        margin: 5

    },
    container: {
        flex: 1,
        alignContent: 'flex-start',
        margin: 2
    },
    text: {
        textAlign: 'justify',
        margin: 5,
        color: 'black'

    }
});

class FounderCard extends React.Component {

    render() {
        const {image,name, title, story} = this.props;

        return(
            <View style = {styles.container}>
                <Card>
                    <View style = {styles.row}>
                        <Image style = {styles.image} source={image}/>
                    </View>
                    <Text style={{fontWeight: 'bold',textAlign: 'center', margin: 5, color: 'black'}}>
                        {name}
                    </Text>
                    <Text style={{fontWeight: 'bold',textAlign: 'center', margin: 5, color: 'black'}}>
                        {title}
                    </Text>
                    <Text style={styles.text}>
                        {story}
                    </Text>
                </Card>
            </View>

        )
    }
}

export default FounderCard;
