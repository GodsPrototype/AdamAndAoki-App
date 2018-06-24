import React, {Component} from 'react';
import {View, Text, TextInput, Picker, Alert} from 'react-native';
import {Button, Divider} from 'react-native-material-ui';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(false);
SQLite.enablePromise(false);
let db, mid = -1;

class EditMemberScreen extends Component {
  constructor(props) {
    super(props);
    // Initialize an empty member in case this is not an edit of an existing one
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
    // Also save the database reference so we could query and modify data
    mid = props.navigation.getParam('id', -1);
    db = props.navigation.getParam('database');
  }

  // Query member data after everything is set up
  componentDidMount = () => {
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

  // If this is an edit of an existing member, query its data from the database. Add the results
  // to the state.
  queryData = () => {
    if(mid !== -1){
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM FamilyMember JOIN exposuretimes ON skinType = skin_type WHERE id = ?',
          [mid],
          (tx, results) => {
            this.setState({member: results.rows.item(0)});
          },
          this.errorCB
        );
      });
    }
  }

  // Insert the newly created member data into the database
  insertData = () => {
    db.transaction((tx) => {
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

  // If we're editing an existing member, update the data
  updateData = () => {
    db.transaction((tx) => {
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

  // Delete the member from the database
  deleteData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM FamilyMember WHERE id = ?',
        [this.state.member.id],
        this.successCB,
        this.errorCB
      );
    })
  }

  // Save button function. It first validates the data. If everything is ok,
  // it checks whether we should insert or update the data,
  // based on whether this is an edit or creation of a member. Then the
  // beforeBack function is called to make sure that the previous screens
  // are updated with the newest data and the app will navigate back to the
  // previous screen. If the validation is not passed, this function will not do
  // anything.
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

  // This validates whether the user has entered a name for the new member. The
  // skin type field is also required, but the picklist allows us to emit the
  // option of not selecting a value, thus, we do not need to validate the field.
  // If validation fails, it will display a pop-up with the direction to enter a name.
  validateData = () => {
    if(this.state.member.name === ''){
      Alert.alert('Error', 'Please enter a name');
      return false;
    }
    return true;
  }

  // The delete button function. It deletes the data, executes any refresh funtions
  // from previous screens and navigates back to the main screen of the app.
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
