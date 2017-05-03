import React, { Component } from 'react';
import { connect } from 'react-redux'
import {AlertIOS,AsyncStorage,Button,View,ScrollView,Text,TextInput,StyleSheet,Switch,TouchableOpacity} from 'react-native'
import * as actions from '../actions'


class SettingsScene extends Component {

  state = {
    email: '',
    nickname: '',
    fullname: '',
    password: '',
    confirmPassword: '',
    syncSwitchIsOn: false,
    sendNotificationsSwitchIsOn: false,
  }

  componentWillMount() {
    this.setStateFromProps();
  }

  setStateFromProps() {
    const {user} = this.props;

    this.setState({
      email: user.email ? user.email : '',
      nickname: user.nickname ? user.nickname : '',
      fullname: user.fullname ? user.fullname : '',
      password: '',
      confirmPassword: '',
      syncSwitchIsOn: user.sync ? user.sync : false,
      sendNotificationsSwitchIsOn: user.sendNotifications ? user.sendNotifications : false,
    });
  }

  //
  //  Update redux state and persist user changes
  //
  applyUserUpdates() {

    const {password,confirmPassword} = this.state;

    if ( password !== confirmPassword ) {
      AlertIOS.alert("Passwords must match");
      return;
    }

    updatedUser = {
      email: this.state.email,
      nickname: this.state.nickname,
      fullname: this.state.fullname,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      sync: this.state.syncSwitchIsOn,
      sendNotifications: this.state.sendNotificationsSwitchIsOn,
      isLoggedIn: true,
    }

    AsyncStorage.setItem( 'user', JSON.stringify(updatedUser), (err) => {
        if (err) {
          AlertIOS.alert(err.message);
          return;
        }
        this.props.dispatch(actions.userLoaded(updatedUser));
      } );
  }

  //
  // log user off system
  // TODO:  persist logging off field in saved user
  //
  logoff() {
    AsyncStorage.mergeItem( 'user', JSON.stringify({isLoggedIn:false}), (err) => {
        if (err) {
          AlertIOS.alert(err.message);
          return;
        }
        this.props.dispatch(actions.logoff());
      } );
  }

  //
  // remove all goals -- basically reset system
  //
  onRemoveAllGoalsPress = () => {
    AlertIOS.alert(
     'Remove Goal',
     'Are you sure you want to remove ALL goals?',
     [
       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'Remove All', onPress: () => {console.log('Remove All Pressed');
           var goalCount = this.props.goals.length;
           var idsToDelete = [];
           for ( var i = 0; i < goalCount; i++ ) {
             idsToDelete[i] = this.props.goals[i].id;
           }
           AsyncStorage.multiRemove(idsToDelete,(errors) => {
             if ( errors ) {
               console.log(errors); // TODO: expose full errors:[Error]
             } else {
               AlertIOS.alert('All goals removed.');
               this.props.dispatch(actions.removeAllGoals())
             }
           })
        }},
     ],
    );
  }

  onRemoveAccount() {
    AlertIOS.alert(
     'Remove Account',
     'This will delete your account and return you to the login.  Are you sure?',
     [
       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'Remove All', onPress: () => {console.log('Remove Acct Pressed');

           AsyncStorage.removeItem(this.props.user.id,(err) => {
             if ( err ) {
               console.log(err); // TODO: expose full errors:[Error]
             } else {
               AlertIOS.alert('Account removed.');
               this.props.dispatch(actions.accountRemoved())
             }
           })
        }},
     ],
    );
  }

  render() {
    const { user } = this.props;

    return (
      <View style={styles.content}>
        <View style={{height:73,padding:10,paddingTop:30,backgroundColor:'#008cba'}}>
          <Text style={styles.headerTitle}>SETTINGS</Text>
        </View>

        <ScrollView style={styles.content}>

         <View style={styles.borderedContainer}>
           <Text style={styles.labelStyle}>Email</Text>
           <TextInput style={styles.inputStyle}
             placeholder="user@gmail.com"
             autoCapitalize = 'none'
             keyboardType = 'email-address'
             value={this.state.email}
             onChangeText={email => this.setState({ email: email })}
           />
         </View>

         <View style={styles.borderedContainer}>
           <Text style={styles.labelStyle}>Nickname</Text>
           <TextInput style={styles.inputStyle}
             placeholder="superstar"
             autoCapitalize = 'none'
             value={this.state.nickname}
             onChangeText={nickname => this.setState({ nickname: nickname })}
           />
         </View>

         <View style={styles.borderedContainer}>
           <Text style={styles.labelStyle}>Full Name</Text>
           <TextInput style={styles.inputStyle}
             placeholder="Jane Doe"
             autoCapitalize = 'none'
             value={this.state.fullname}
             onChangeText={fullname => this.setState({ fullname: fullname })}
           />
         </View>

         <View style={styles.borderedContainer}>
           <Text style={styles.labelStyle}>Password</Text>
           <TextInput style={styles.inputStyle}
            secureTextEntry
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password: password })}
          />
        </View>

        <View style={styles.borderedContainer}>
          <Text style={styles.labelStyle}>Confirm</Text>
          <TextInput style={styles.inputStyle}
           secureTextEntry
           placeholder="repeat password"
           value={this.state.confirmPassword}
           onChangeText={password => this.setState({ confirmPassword: password })}
         />
       </View>

       <View style={styles.borderedContainer}>
           <Text style={styles.labelStyle}>Sync to cloud</Text>
           <Switch
              style={styles.switchStyle}
              onValueChange={(value) => this.setState({syncSwitchIsOn: value})}
              value={this.state.syncSwitchIsOn} />
       </View>

         <View style={styles.borderedContainer}>
           <Text style={styles.labelStyle}>Push Notifications</Text>
           <Switch
              style={styles.switchStyle}
              onValueChange={(value) => this.setState({sendNotificationsSwitchIsOn: value})}
              value={this.state.sendNotificationsSwitchIsOn} />
         </View>

           <View style={{marginTop:20}} flexDirection='row' justifyContent='space-around'>
             <Button onPress={this.setStateFromProps.bind(this)} title='Reset'/>
             <Button onPress={this.applyUserUpdates.bind(this)} title='Apply'/>
           </View>

           <View style={{marginTop:10}} flexDirection='row' justifyContent='space-around'>
             <Button onPress={this.logoff.bind(this)} title='Logoff'/>
           </View>
           <View style={{marginTop:20}} flexDirection='row' justifyContent='space-around'>
             <Button onPress={this.onRemoveAllGoalsPress.bind(this)}  title='Remove All Goals'/>
           </View>
           <View style={{marginTop:10}} flexDirection='row' justifyContent='space-around'>
             <Button onPress={this.onRemoveAccount.bind(this)} title='Remove Account'/>
           </View>
           <View style={{height:100}}></View>
         </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  borderedContainer: {
    borderBottomWidth: 1,
    padding: 5,
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    flex: 1,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    paddingTop: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#008cba',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  switchStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    marginRight: 10,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  inputContainerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
});

const mapStateToProps = (state) => {
  return {
    goals: state.goals,
    user: state.session
  }
}

export default connect(mapStateToProps)(SettingsScene)
