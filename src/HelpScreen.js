import React from 'react';
import {View, Text} from 'react-native';
import {Toolbar, Card, Icon} from 'react-native-material-ui';

// This screen can load some text to be shown on a standard Help screen.
// There are two help screens for the Dashboard and the Family Sreen. When each
// of these navigate to the screen, it pases a 'text' parameter to the help screen
// to show the appropriate help message.

class HelpScreen extends React.Component {
  render() {
    const text = this.props.navigation.state.params.text;
    return(
      <View>
        <Toolbar
          leftElement="arrow-back"
          style={styles.toolbarStyle}
          centerElement="Help"
          onLeftElementPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.cardContainer}>
          <Icon name="help" size={50}/>
          <Card>
            <Text style={styles.textStyle}>{text}</Text>
          </Card>
        </View>
      </View>
    )
  }
}

const styles = {
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  cardContainer: {
    margin: 10,
    alignItems: 'center',
  },
  toolbarStyle: {
    flex: 1
  }
}

export default HelpScreen;
