import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Linking, ScrollView} from 'react-native';
import {ActionButton, Toolbar, ListItem, Avatar, Button, Icon} from 'react-native-material-ui';

const helpText = "Press on the + button on the bottom right to add a family member\nYou will then be able to add this person's information, including phone number and skin type\nYou can then easily track your family members' risk levels and send them recommendations based on the UV index";

class FamilyScreen extends Component {
    constructor() {
        super();
        this.state = {
            familyMembers: []
        }
    }

    // After the component mounts, get the database reference from the props
    // and query the family members to display on the screen.
    componentDidMount = () => {
        db = this.props.database;
        this.queryData();
    }

    // Error and success callbacks to be used during database transactions
    errorCB = (err) => {
        console.log('### Error: ' + err.message)
        return false;
    }

    // The logging has been commented out for performace reasons. In a more extensive
    // app this method might include more actions
    successCB = () => {
        // console.log('### Done.');
    }

    // Query all member data from the database
    queryData = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM FamilyMember JOIN ExposureTime USING(skinType)',
                [],
                (tx, results) => {
                    this.setState({familyMembers: results.rows.raw()});
                },
                this.errorCB
            );
        });
    }

    // To refresh the family screen when we modify data in future screens and come back
    goBackFunction = () => {
        this.queryData();
    }

    // Send button function. If the member has a phone number and there is a UV threat,
    // a message is composed and the user is redirected to WhatsApp to finalize the sending
    send = (member) => {
        if(member.phone === null || member.exposureTime === null){
            return;
        }
        message = 'Hi ' + member.name + '! Make sure to not stay out in the sun for longer than ' + this.formatTime(member.exposureTime) + '.';
        Linking.openURL('whatsapp://send?text=' + message + '&phone=' + member.phone);
    }

    // this formats time to be a readable string
    formatTime = (time) => {
        if(time === null){
            return 'No UV threat';
        }
        timeString = '';
        hours = Math.trunc(time/60);
        if(hours > 0){
            timeString += hours + 'h and ';
        }
        timeString += (time - hours*60) + 'mins';
        return timeString;
    }

    // For every member, this will return a list item with all the data filled in
    renderMemberItem = ({ item }) => (
        <ListItem
            divider
            leftElement={<Avatar text={item.initials} style={styles.leftElementStyle} />}
            centerElement={
                <View>
                    <Text style={styles.itemText} >{item.name}</Text>
                    <View style={styles.centerElementContainer} >
                        <Icon name="brightness-low" style={styles.centerElementIcon} />
                        <Text style={styles.centerElementText} >{this.formatTime(item.exposureTime)}</Text>
                    </View>
                </View>
            }
            rightElement={
                <Button
                    primary icon="send" text="Send"
                    onPress={()=>this.send(item)}
                    disabled={item.phone === null || item.phone === '' || item.exposureTime === ''}
                />
            }
            onPress={() => this.props.navigation.navigate(
                'ViewMember',
                {member: item, beforeBack: this.goBackFunction, database: db}
            )}
        />
    )

    // Extracts the keys for a list item
    keyExtractor = (item) => item.id.toString();

    // Add button function. It navigates the user to the edit screen to enter a new member.
    add = () => {
        this.props.navigation.navigate('EditMember', {beforeBack: this.goBackFunction, database: db});
    }

    // Help button function, it nagivates the user to the help screen
    helpButton = () => {
        this.props.navigation.navigate('Help', { text: helpText})
    }

    render() {
        // This will whoose what to display on the screen. If there are no members yet,
        // it will return a message describing what to do. Otherwise, it will return a
        // list of existing members.
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
                    <ActionButton accessible accessibilityComponentType="button" accessibilityLabel="Add a Family Member" icon="add" onPress={this.add} accessibilityComponentType="button" />
                </View>
            </View>
        )
    }
}

const styles = {
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
    },
    itemText: {
      fontSize: 18,
      color: 'black'
    },
    centerElementContainer: {
      flexDirection: 'row'
    },
    centerElementIcon: {
      marginRight: 5
    },
    centerElementText: {
      fontSize: 16
    },
    leftElementStyle: {
      content: {
        fontSize: 26
      }
    }
};

export default FamilyScreen;
