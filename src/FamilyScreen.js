import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
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
            member={item}
            onPress={() => this.props.navigation.navigate(
                'ViewMember',
                {member: item, beforeBack: this.goBackFunction, database: db}
            )}
        />
    );

    keyExtractor = (item) => item.id.toString();

    add = () => {
        this.props.navigation.navigate('EditMember', {beforeBack: this.goBackFunction, database: db});
    }

    render() {
        screenContent = () => {
            if(typeof this.state.familyMembers === 'undefined' || this.state.familyMembers.length === 0){
                return(
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                    <Text>Press the button below to add family members!</Text>
                    </View>
                );
            }
            return(
                <View accessibilityLiveRegion="polite">
                <FlatList
                    contentContainerStyle={styles.listStyle}
                    data={this.state.familyMembers}
                    renderItem={this.renderMemberItem}
                    keyExtractor={this.keyExtractor}
                    />
                </View>
            )
        }

        return(
            <View style={styles.containerStyle}>
              <Toolbar centerElement="My Family" />
              {screenContent()}
              <View style={styles.bottomNavStyle}>
                  <ActionButton icon="add" onPress={this.add} accessibilityComponentType="button" />
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
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  bottomNavStyle: {
    flex: 1
  }
});

export default FamilyScreen;
