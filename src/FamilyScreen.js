import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Linking} from 'react-native';
import {ActionButton, Toolbar, ListItem, Avatar, Button} from 'react-native-material-ui';

const helpText = "Press on the + button on the bottom right to add a family member\nYou will then be able to add this person's information, including phone number and skin type\nYou can then easily track your family members' risk levels and send them recommendations based on the UV index";

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
    send = (member) => {
        if(member.phone === null || member.exposure_time === null){
            return;
        }
        message = 'Hi ' + member.name + '! Make sure to not stay out in the sun for longer than ' + this.formatTime(member.exposure_time) + '.';
        Linking.openURL('whatsapp://send?text=' + message + '&phone=' + member.phone);
    }

    formatTime = (time) => {
        if(time === null){
            return '';
        }
        timeString = '';
        hours = Math.trunc(time/60);
        if(hours > 0){
            timeString += hours + 'h and ';
        }
        timeString += (time - hours*60) + 'mins';
        return timeString;
    }

    formatTimeString = (time) => {
        if(time === null){
            return 'No UV threat';
        }
        return 'Safe sun exposure: ' + this.formatTime(time);
    }

    renderMemberItem = ({ item }) => (
        <ListItem
            divider
            leftElement={<Avatar text={item.initials} style={{content: {fontSize: 26}}} />}
            centerElement={{
                primaryText: item.name,
                secondaryText: this.formatTimeString(item.exposure_time)
            }}
            rightElement={
                <Button 
                    primary icon="send" text="Send" 
                    onPress={()=>this.send(item)} 
                    disabled={item.phone === null || item.phone === '' || item.exposure_time === ''}
                />
            }
            onPress={() => this.props.navigation.navigate(
                'ViewMember',
                {member: item, beforeBack: this.goBackFunction, database: db}
            )}
            style={{
                primaryText: {
                    fontSize: 18
                },
                secondaryText: {
                    fontSize: 16
                }
            }}
        />
    )

    keyExtractor = (item) => item.id.toString();

    add = () => {
        this.props.navigation.navigate('EditMember', {beforeBack: this.goBackFunction, database: db});
    }

    helpButton = () => {
        this.props.navigation.navigate('Help', { text: helpText})
    }

    render() {
        screenContent = () => {
            if(typeof this.state.familyMembers === 'undefined' || this.state.familyMembers.length === 0){
                return(
                    <View style={styles.noMemberContainerStyle} >
                    <Text>Press the button below to add family members!</Text>
                    </View>
                );
            }
            return(
                <View accessibilityLiveRegion="polite">
                    <FlatList
                        data={this.state.familyMembers}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderMemberItem}
                    />
                </View>
            )
        }

        return(
            <View style={styles.containerStyle}>
                <Toolbar centerElement="My Family" rightElement={{actions: ['help']}} onRightElementPress={this.helpButton}/>
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
    bottomNavStyle: {
        flex: 1
    },
    noMemberContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FamilyScreen;
