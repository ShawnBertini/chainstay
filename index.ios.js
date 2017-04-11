import React, { Component } from 'react'
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux'

import session from './src/reducers/Session'
import goals from './src/reducers/Goals'
import * as sessionActions from './src/actions/SessionActions';
import * as goalActions from './src/actions/GoalActions';
import App from './src/App'

const initialState = {
  goals: [],
  session: null
}

let store = createStore(combineReducers({goals: goals, session: session}), initialState );

// log state upon change
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

export default class Chainstay extends Component {

  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }

}

AppRegistry.registerComponent('chainstay', () => Chainstay);
