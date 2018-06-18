import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Divider} from 'react-native-material-ui';

class ViewMemberScreen extends Component {
    constructor(){
        super();
        this.state = {
            member: {
                name: 'Jane',
                initials: 'J',
                phone: '012345678',
                skinType: 3
            }
        }
    }
    render() {
        return(
            <View>
                <Text style={{fontSize: 30}}>ViewMemberScreen</Text>
                <View>
                    <Text>Name:</Text>
                    <Text>{this.state.member.name}</Text>
                    <Text>Initials:</Text>
                    <Text>{this.state.member.Initials}</Text>
                    <Text>Phone number:</Text>
                    <Text>{this.state.member.phone}</Text>
                    <Text>Skin type:</Text>
                    <Text>{this.state.member.skinType}</Text>
                </View>
                <Divider />
                <View>
                    <Text>Reccommendations:</Text>
                </View>
                <View style={styles.buttonPanel} >
                    <Button raised primary icon="edit" text="Edit"
                        onPress={() => console.log('edit')}
                    />
                    <Button raised accent icon="delete" text="Delete"
                        onPress={() => console.log('delete')}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  buttonPanel: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
})

export default ViewMemberScreen;