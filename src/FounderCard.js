import React from 'react';
import {Text, Image, View} from 'react-native';
import {Card} from 'react-native-material-ui';


// This component renders a card containing a given image, name, title and story.
// This is for the about screen, which contains the image, name, title and story
// for each of the founders. The data is passed through and rendered dynamically
// depending on the data that is passed through
class FounderCard extends React.Component {

    render() {
        const {image,name, title, story} = this.props;

        return(
            <View style = {styles.container}>
                <Card>
                    <View style = {styles.row}>
                        <Image style = {styles.image} source={image}/>
                    </View>
                    <Text style={styles.titleStyle}>
                        {name}
                    </Text>
                    <Text style={styles.titleStyle}>
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

const styles = {
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

    },
    titleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5,
        color: 'black'
    }
}

export default FounderCard;
