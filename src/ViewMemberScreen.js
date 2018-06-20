import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Divider} from 'react-native-material-ui';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);
let db, mid = -1;

class ViewMemberScreen extends Component {
    constructor(){
        super();
        this.state = {
            member: {
                id: -1,
                name: '',
                initials: '',
                phone: '',
                skinType: 1
            }
        }
    }

    componentWillMount = () => {
        mid = this.props.navigation.getParam('id', -1);
        db = this.props.navigation.getParam('database');
        this.setState({member: {...this.state.member, id: mid}});
        this.queryData();
    }

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

    goBackFunction = () => {
        this.props.navigation.state.params.beforeBack();
        this.queryData();
    }

    edit = () => {
        this.props.navigation.navigate(
            'EditMember', 
            {id: this.state.member.id, beforeBack: this.goBackFunction, database: db}
        );
    }

    delete = () => {
        this.deleteData();
        this.props.navigation.state.params.beforeBack();
        this.props.navigation.goBack();
    }

    render() {
        return(
            <View>
                <Text style={{fontSize: 30}}>ViewMemberScreen</Text>
                <View>
                    <Text>Name:</Text>
                    <Text>{this.state.member.name}</Text>
                    <Text>Initials:</Text>
                    <Text>{this.state.member.initials}</Text>
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
                    <Button raised accent icon="delete" text="Delete"
                        onPress={this.delete}
                    />
                    <Button raised primary icon="edit" text="Edit"
                        onPress={this.edit}
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