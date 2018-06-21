import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {ActionButton, Toolbar} from 'react-native-material-ui';
import MemberCard from './MemberCard';

class FamilyScreen extends Component {
    constructor() {
        super();
        this.state = {
            familyMembers: []
        }
    }

    componentWillMount = () => {
        db = this.props.database;
        this.queryData();
    }

    // SQL methods
    errorCB = (err) => {
        console.log('### Error: ' + err.message)
        return false;
    }

    successCB = () => {
        console.log('### Done.');
    }

    queryData = () => {
        db.transaction((tx) => {
            console.log('### Querying...');
            tx.executeSql(
                'SELECT * FROM FamilyMember JOIN exposuretimes ON skinType = skin_type',
                [],
                (tx, results) => {
                    console.log('### Query completed');
                    this.setState({familyMembers: results.rows.raw()});
                },
                this.errorCB
            );
        });
    }

    // To refresh the family screen when we modify data and come back
    goBackFunction = () => {
        this.queryData();
    }

    // Render helper methods
    renderMemberItem = ({ item }) => (
        <MemberCard
            id={item.id}
            name={item.name}
            initials={item.initials}
            image={item.image}
            onPress={() => this.props.navigation.navigate(
                'ViewMember',
                {member: item, beforeBack: this.goBackFunction, database: db}
            )}
        />
    );

    keyExtractor = (item) => item.id;

    getColumnCount = () => {
        // A weird hack to get the number of columns for the list
        return Math.trunc(Dimensions.get('window').width / 100);

    }

    onButtonPress = (e) => {
        console.log(e);
        switch(e) {
            case "main-button":
                break;
            case "add":
                this.props.navigation.navigate('EditMember', {beforeBack: this.goBackFunction, database: db});
                break;
            case "send":
                console.log('send');
                break;
        }
    }

    render() {
        return(
            <View style={styles.containerStyle}>
              <Toolbar centerElement="My Family" />
              <View style={styles.listStyle}>
                <FlatList
                    data={this.state.familyMembers}
                    renderItem={this.renderMemberItem}
                    keyExtractor={this.keyExtractor}
                    numColumns={this.getColumnCount()}
                    />
              </View>
              <View style={styles.bottomNavStyle}>
                  <ActionButton
                      actions={[{icon: 'add', label: 'Add Family Member', name: 'add'},{icon: 'send', label: 'Send Notifications', name: 'send'}]}
                      onPress={(e) => this.onButtonPress(e)}
                      transition="speedDial"
                      icon="share"
                      />
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  listStyle: {
    flex: 0,
    alignItems: 'center'
  },
  bottomNavStyle: {
    flex: 1
  }
});

export default FamilyScreen;
