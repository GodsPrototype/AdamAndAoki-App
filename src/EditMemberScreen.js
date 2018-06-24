import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Picker, Alert} from 'react-native';
import {Button, Divider} from 'react-native-material-ui';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);
let db, mid = -1;

class EditMemberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: {
        id: -1,
        name: '',
        initials: '',
        skinType: 'st1',
        phone: ''
      }
    }
      // Save the id in a local variable mid, because the state will take some time to set up completely
      mid = props.navigation.getParam('id', -1);
      db = props.navigation.getParam('database');
  }

  componentDidMount = () => {
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
        tx.executeSql(
          'SELECT * FROM FamilyMember JOIN exposuretimes ON skinType = skin_type WHERE id = ?',
          [mid],
          (tx, results) => {
            console.log('### Query completed');
            this.setState({member: results.rows.item(0)});
          },
          this.errorCB
        );
      });
    }
  }

  insertData = () => {
    db.transaction((tx) => {
      console.log('### Inserting...');
      tx.executeSql(
        'INSERT INTO FamilyMember (name, initials, phone, skinType) VALUES (?, ?, ?, ?)',
        [
          this.state.member.name,
          this.state.member.initials,
          this.state.member.phone,
          this.state.member.skinType
        ],
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

  save = () => {
    if(this.validateData()){
      if(this.state.member.id === -1){
        this.insertData();
      } else {
        this.updateData();
      }
      this.props.navigation.state.params.beforeBack(this.state.member);
      this.props.navigation.goBack();
    }
  }

  validateData = () => {
    if(this.state.member.name === ''){
      Alert.alert('Error', 'Please enter a name');
      return false;
    }
    return true;
  }

  delete = () => {
    this.deleteData();
    this.props.navigation.state.params.beforeBack();
    this.props.navigation.navigate('Swipeable');
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <View style={styles.inputContainerStyle} >
            <Text style={styles.labelStyle}>Name*:</Text>
            <TextInput
              style={styles.inputStyle}
              underlineColorAndroid="transparent"
              placeholder="Name"
              onChangeText={(text) => this.setState({member: {...this.state.member, name: text, initials: text.charAt(0)}})}
              value={this.state.member.name}
            />
          </View>
          <View style={styles.inputContainerStyle} >
            <Text style={styles.labelStyle}>Phone number:</Text>
            <TextInput
              style={styles.inputStyle}
              underlineColorAndroid="transparent"
              placeholder="Phone Number"
              onChangeText={(text) => this.setState({member: {...this.state.member, phone: text}})}
              value={this.state.member.phone}
            />
          </View>
          <View style={styles.inputContainerStyle} >
            <Text style={styles.labelStyle}>Skin type*:</Text>
            <View style={styles.pickerContainerStyle}>
              <Picker
                  style={styles.pickerStyle}
                  selectedValue={this.state.member.skinType}
                  onValueChange={(itemValue, itemPosition) => this.setState({member: {...this.state.member, skinType: itemValue}})} >
                <Picker.Item label="Very Light" value="st1" />
                <Picker.Item label="Light" value="st2" />
                <Picker.Item label="Light-Medium" value="st3" />
                <Picker.Item label="Medium" value="st4" />
                <Picker.Item label="Medium-Dark" value="st5" />
                <Picker.Item label="Dark" value="st6" />
              </Picker>
            </View>
          </View>
          <Divider />
          <Text>* - Required</Text>
        </View>
        <View style={styles.buttonPanel} >
          <Button raised accent icon="cancel" text="Cancel"
            onPress={() => this.props.navigation.goBack()}
            accessibilityComponentType="button"
          />
          <Button raised accent disabled={this.state.member.id === -1} icon="delete" text="Delete"
            onPress={this.delete} accessibilityComponentType="button"
          />
          <Button raised primary icon="done" text="Save"
            onPress={this.save} accessibilityComponentType="button"
          />
        </View>
      </View>
    )
  }
}

const styles = {
  buttonPanel: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20
  },
  container: {
    padding: 10
  },
  inputStyle: {
    fontSize: 18,
    borderColor: 'green',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'center'
  },
  inputContainerStyle: {
    marginTop: 10,
    marginBottom: 10
  },
  labelStyle: {
    fontSize: 14,
    color: 'black'
  },
  pickerContainerStyle: {
    borderColor: 'green',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
  }
};

export default EditMemberScreen;
