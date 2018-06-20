import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Picker, ActivityIndicator} from 'react-native';
import {ActionButton, Button} from 'react-native-material-ui';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);
let db, mid = -1;

class EditMemberScreen extends Component {
  constructor() {
    super();
    this.state = {
      member: {
        id: mid,
        name: '',
        initials: '',
        skinType: '',
        phone: ''
      }
    }
  }

  componentWillMount = () => {
    // Save the id in a local variable mid, because the state will take some time to set up completely
    mid = this.props.navigation.getParam('id', -1);
    db = this.props.navigation.getParam('database');
    this.setState({member: {...this.state.member, id: mid}});
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
    if(mid !== -1){
      db.transaction((tx) => {
        console.log('### Querying...');
        tx.executeSql('SELECT * FROM FamilyMember WHERE id = ?', [mid], (tx, results) => {
            console.log('### Query completed');
            this.setState({member: results.rows.item(0)});
        }, this.errorCB);
      });
    }
  }

  save = () => {
    if(this.state.member.id === -1){
      this.insertData();
    } else {
      this.updateData();
    }
    this.props.navigation.state.params.beforeBack();
    this.props.navigation.goBack();
  }

  insertData = () => {
    db.transaction((tx) => {
      console.log('### Inserting...');
      tx.executeSql(
        'INSERT INTO FamilyMember (name, initials, phone, skinType) VALUES (?, ?, ?, ?)',
        [this.state.member.name, this.state.member.initials, this.state.member.phone, this.state.member.skinType],
        this.successCB,
        this.errorCB
      );
    })
  }

  updateData = () => {
    db.transaction((tx) => {
      console.log('### Updating...');
      tx.executeSql(
        'UPDATE FamilyMember SET name = ?, initials = ?, phone = ?, skinType = ? WHERE id = ?',
        [
          this.state.member.name, 
          this.state.member.initials,
          this.state.member.phone, 
          this.state.member.skinType,
          this.state.member.id
        ],
        this.successCB,
        this.errorCB
      );
    })
  }

  render() {
    return(
      <View>
        <ActivityIndicator animating={mid !== -1 && this.state.member.id === -1} />
        <Text style={{fontSize: 30}}>EditMemberScreen</Text>
        <View>
          <Text>Name:</Text>
          <TextInput
            placeholder="Jane"
            onChangeText={(text) => this.setState({member: {...this.state.member, name: text}})}
            value={this.state.member.name}
          />
          <Text>Initials:</Text>
          <TextInput
            placeholder="J"
            onChangeText={(text) => this.setState({member: {...this.state.member, initials: text}})}
            value={this.state.member.initials}
          />
          <Text>Phone number:</Text>
          <TextInput
            placeholder="+123456789"
            onChangeText={(text) => this.setState({member: {...this.state.member, phone: text}})}
            value={this.state.member.phone}
          />
          <Text>Skin type:</Text>
          <Picker
              selectedValue={this.state.member.skinType}
              onValueChange={(itemValue, itemPosition) => this.setState({member: {...this.state.member, skinType: itemValue}})} >
            <Picker.Item label="Light" value={1} />
            <Picker.Item label="Medium" value={3} />
            <Picker.Item label="Dark" value={6} />
          </Picker>
        </View>
        <View style={styles.buttonPanel} >
          <Button raised primary icon="done" text="Save"
            onPress={this.save}
          />
          <Button raised accent icon="cancel" text="Cancel"
            onPress={() => this.props.navigation.goBack()}
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

export default EditMemberScreen;
