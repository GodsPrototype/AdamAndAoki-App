import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions, StatusBar} from 'react-native';
import {ActionButton} from 'react-native-material-ui';
import MemberCard from './MemberCard';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);
let db;

class FamilyScreen extends Component {
    constructor() {
        super();
        this.state = {
            familyMembers: []
        }
    }

    componentWillMount = () => {
        this.openDatabase();
        this.queryData();
    }

    componentWillUnmount = () => {
        this.closeDatabase();
    }

    // SQL methods
    errorCB = (err) => {
        console.log('### Error: ' + err.message)
        return false;
    }

    successCB = () => {
        console.log('### Done.');
    }

    openDatabase = () => {
        // Load database from existing file
        console.log('### Opening database...');
        db = SQLite.openDatabase({name : 'MemberDB', createFromLocation : '~MemberDB.db'}, this.successCB, this.errorCB);
    }

    queryData = () => {
        db.transaction((tx) => {
            console.log('### Querying...');
            tx.executeSql('SELECT * FROM FamilyMember', [], (tx, results) => {
                console.log('### Query completed');
                this.setState({familyMembers: results.rows.raw()});
            }, this.errorCB);
        });
    }

    closeDatabase = () => {
        if (db) {
            console.log('### Closing database...');
            db.close(this.successCB, this.errorCB);
        } else {
            console.log('### Database was not opened');
        }
    }

    // Render helper methods
    renderMemberItem = ({ item }) => (
        <MemberCard
            id={item.id}
            name={item.name}
            initials={item.initials}
            image={item.image}
            onPress={() => this.props.navigation.navigate('ViewMember', { id: item.id })}
        />
    );

    keyExtractor = (item) => item.id;

    getColumnCount = () => {
        // A weird hack to get the number of columns for the list
        return Math.trunc(Dimensions.get('window').width / 100);

    }
    render() {
        const {navigate} = this.props.navigation;

        // TODO: Use Sqlite, and load users from there
        return(
            <View>
                <StatusBar hidden />
                <Text>
                    FamilyScreen
                </Text>
                <FlatList
                    data={this.state.familyMembers}
                    renderItem={this.renderMemberItem}
                    keyExtractor={this.keyExtractor}
                    numColumns={this.getColumnCount()}
                    />
                <ActionButton
                    onPress={() => this.props.navigation.navigate('EditMember')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        alignItems: 'center'
    }
});

export default FamilyScreen;
