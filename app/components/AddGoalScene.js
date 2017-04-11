import React, { Component } from 'react';
import {AsyncStorage, Button, StyleSheet,Text,TextInput, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import { connect } from 'react-redux'
import * as goalActions from '../actions/goalActions'
import shortid from 'shortid';

class AddGoalScene extends Component {

  state = { name: '', description: '', buttonText: 'Save' }

  componentWillMount() {

    // if a goal wasn't passed in, we're creating a new one
    const {goal} = this.props;

    if ( !goal ) {
      this.setState({buttonText:'Add'});

    } else {
      this.setState({
        name: goal.name,
        description: goal.description,
      })
    }
  }

  onAddGoalPress = () => {
    const {goal} = this.props;

    // reuse id of goal passed in in case of edit
    let newGoal = {
      id: goal ? goal.id : 'goal:'+shortid.generate(),
      name: this.state.name,
      description: this.state.description,
      completed: false
    };

    AsyncStorage.setItem( newGoal.id, JSON.stringify(newGoal), (err,res) => {
        if ( goal ) {
          this.props.dispatch(goalActions.updateGoal(newGoal));
        } else {
          this.props.dispatch(goalActions.addGoal(newGoal));
        }
        this.props.navigator.pop();
      }
    );

  }

  render() {
    return (
      <View style={styles.content}>
        <View>

            <Text style={{marginTop:50, fontWeight:'bold'}}>New Goal Name: </Text>
            <TextInput
              keyboardType='default'
              style={{height: 40, padding: 5, borderColor: 'gray', borderWidth: 1}}
              placeholder='Enter name of new goal'
              autoFocus
              value={this.state.name}
              onChangeText={(name) => this.setState({name})}
            />

            <Text style={{marginTop:25, fontWeight:'bold'}}>Description: </Text>
            <TextInput
              multiline={true}
              keyboardType='default'
              style={{height: 160, padding: 5, borderColor: 'gray', borderWidth: 1, marginBottom:25}}
              placeholder='Enter a brief description or reason you are setting this goal.'
              value={this.state.description}
              onChangeText={(description) => this.setState({description})}
            />

            <TouchableOpacity onPress={() => this.onAddGoalPress()}>
              <View style={styles.button}>
              <Text style={{color:'white',fontWeight:'bold'}}>{this.state.buttonText}</Text>
              </View>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

//<Button
//  onPress={() => this.onAddGoalPress()}
//  title="Add Button"
//  color="#008cba"
//  accessibilityLabel="Learn more about this purple button"
///>

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
    backgroundColor: '#008cba',
    borderRadius: 5,
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
