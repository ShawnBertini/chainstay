import React, { Component } from 'react';
import {Button, StyleSheet,Text,TextInput, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import { connect } from 'react-redux'
import * as goalActions from '../actions/GoalActions'

class EditGoalScene extends Component {

  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  onAddGoalPress = () => {
    this.props.dispatch(goalActions.addGoal(this.state.text));
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.content}>
        <View>

            <Text style={{marginTop:50, fontWeight:'bold'}}>Goal Name: </Text>
            <TextInput
              keyboardType='default'
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text})}
              placeholder='Enter name of new goal'
              value={this.props.goal.name}
            />

            <TouchableOpacity onPress={() => this.onSaveGoalPress()}>
              <View style={styles.button}>
              <Text style={{color:'white',fontWeight:'bold'}}>save</Text>
              </View>
            </TouchableOpacity>

            <Button
              onPress={() => this.onSaveGoalPress()}
              title="save"
              color="#841584"
              accessibilityLabel="Press to save your changes"
            />
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    paddingTop: 74,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#841584',
    padding: 10,
    margin: 10,
  }
});

//
// TODO: what if no part of tree needs to be accessed?? Empty this function?
//
const mapStateToProps = (state) => {
  return {
    goals: state
  }
}

export default connect(mapStateToProps)(AddGoalScene)
