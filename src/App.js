import React, { Component } from 'react';
import {AsyncStorage,Image,View,Text,ListView,StyleSheet,TouchableHighlight,NavigatorIOS} from 'react-native'
import { connect } from 'react-redux'
import * as goalActions from './actions/GoalActions'
import * as sessionActions from './actions/SessionActions'
import LoginScene from './components/LoginScene'
import LoadingScene from './components/LoadingScene'
import MainView from './components/MainView'

//
// Launch scene manages transition from
// LOADING --> LOGIN --> APP
//
class App extends Component {

  componentDidMount() {

    //load all goals
    AsyncStorage.getAllKeys(
      (error,keys) => {
        if (error) {console.warn(error);return;}  //TODO: handle better

        //console.warn("KEY COUNT: "+keys.length);
        for ( var i = 0; i < keys.length; i++ ) {
          // console.warn('KEY: '+key);
          if ( keys[i].startsWith('goal:')) {
            AsyncStorage.getItem(keys[i],(error,goal) => {
              this.props.dispatch( goalActions.rehydrateGoal(JSON.parse(goal)) );
            })
          }
        }

      }
    );

    // load last user session
    // Loading this session can trigger jump from loading screen to
    // login or right to app, but goals may not be loaded yet
    // TODO: consider waiting for goals to avoid jumpy display if jumping to app
    AsyncStorage.getItem( 'user', (error,userJSON) => {
      if (error) {console.warn(error);return;}  //TODO: handle better
      if (userJSON == null || userJSON == '') {
        this.props.dispatch( sessionActions.loginComplete({email:'',password:'',isLoggedIn:false,newUser:true}));
      }
      this.props.dispatch( sessionActions.userLoaded(JSON.parse(userJSON)));
      // this.props.dispatch( sessionActions.loginComplete( {name:'joe schmoe'} ))
    });


  }

  render() {
    const { session } = this.props;

    if ( session == null ) {
      return <LoadingScene/>;
    }
    if ( session.isLoggedIn ) {
      return <MainView/>;
    }

    return <LoginScene/>;
  }
}


const mapStateToProps = (state) => {
  return {
    session: state.session
  }
}

export default connect(mapStateToProps)(App)
