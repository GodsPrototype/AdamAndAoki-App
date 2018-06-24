import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Toolbar, Card, Icon} from 'react-native-material-ui';

class HelpScreen extends React.Component {
  render() {
    const text = this.props.navigation.state.params.text;
    return(
      <View>
        <Toolbar
          leftElement="arrow-back"
          style={{flex: 1}}
          centerElement="Help"
          onLeftElementPress={() => this.props.navigation.goBack}
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

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10
  },
  cardContainer: {
    margin: 10,
    alignItems: 'center',
  }
})

export default HelpScreen;
