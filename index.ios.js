import React, { Component } from 'react'
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {createStore, combineReducers} from 'redux';
import session from './app/reducers/session'
import goals from './app/reducers/goals'
import * as sessionActions from './app/actions/sessionActions';
import * as goalActions from './app/actions/goalActions';
import App from './app/App'
import {Provider} from 'react-redux'

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
