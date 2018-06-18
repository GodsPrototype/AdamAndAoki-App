import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Picker, ActivityIndicator} from 'react-native';
import {ActionButton, Button} from 'react-native-material-ui';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);
let db;

class EditMemberScreen extends Component {
  constructor() {
    console.log('%%%%% CONSTRUCTOR');
    super();
    // will have to add all fields into the state object
    this.state = {
      member: {
        id: -1,
        name: '',
        initials: '',
        skinType: '',
        phone: ''
      }
    }
  }

  componentWillMount = () => {
    // db = this.props.navigation.getParams('db');
    console.log('%%%%% CMP WILL MOUNT');
    // this.setState({member: {id: this.props.navigation.getParams('id', -1)}})
    // this.openDatabase();
    // this.queryData();
  }

  componentWillUnmount = () => {
    // this.closeDatabase();
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
    console.log('%%%%% QUERY DATA');
    if(this.state.member.id !== -1){
      db.transaction((tx) => {
        console.log('### Querying...');
        tx.executeSql('SELECT * FROM FamilyMember WHERE id = ?', [this.state.member.id], (tx, results) => {
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
    this.props.navigation.goBack();
  }

  insertData = () => {
    db.transaction((tx) => {
      console.log('### Inserting...');
      tx.executeSql(
        'INSERT INTO FamilyMember (name, initials) VALUES (?, ?)',
        [this.state.member.name, this.state.member.initials],
        this.successCB,
        this.errorCB
      );
    })
  }

  updateData = () => {
    db.transaction((tx) => {
      console.log('### Updating...');
      tx.executeSql(
        'UPDATE FamilyMember SET name = ?, initials = ? WHERE id = ?',
        [this.state.member.name, this.state.member.initials, this.state.member.initials],
        this.successCB,
        this.errorCB
      );
    })
  }

  deleteData = () => {
    db.transaction((tx) => {
      console.log('### Deleting...');
      tx.executeSql(
        'DELETE FROM FamilyMember WHERE id = ?',
        [this.state.member.id],
        this.successCB,
        this.errorCB
      );
    })
  }

  closeDatabase = () => {
      if (db) {
          console.log('### Closing database...');
          db.close(this.successCB, this.errorCB);
      } else {
          console.log('### Database was not opened');
      }
  }


  render() {
    console.log('%%%%% RENDER');

    return(
      <View>
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
            onPress={() => console.log('save')}
          />
          <Button raised accent icon="cancel" text="Cancel"
            onPress={() => console.log('cancel')}
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
