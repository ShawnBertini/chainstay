import React, { Component } from 'react';
import {AlertIOS,AsyncStorage,Button,Image,View,Text,ListView,NavigatorIOS,StyleSheet,TouchableHighlight,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import * as goalActions from '../actions/GoalActions'
import AddGoalScene from './AddGoalScene'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class GoalListScene extends Component {

  state = { addIcon: null }

  onGoalPress(goal) {
    this.refs.nav.push({title: 'Add',component: AddGoalScene,passProps:{goal:goal}});
  }

  onRemoveGoalPress = (id) => {
    AlertIOS.alert(
     'Remove Goal',
     'Are you sure you want to remove this goal?',
     [
       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'Remove', onPress: () => {console.log('Remove Pressed');
                                        this.removeGoal(id);}},
     ],
    );

  }

  removeGoal(id) {
    AsyncStorage.removeItem(id, (err, result) => {
        if ( err ) {
          console.log(err.message);
          AlertIOS.alert(err.message);
          return;
        }

        this.props.dispatch(goalActions.removeGoal(id));
      }
    )
  }

  componentWillMount() {
    Icon.getImageSource('ios-add-circle-outline',30,'red')
        .then((source) => {
          this.setState({addIcon: source});
        });
  }

  //
  // Can't get icon to display since moving from app.js:
  //        rightButtonIcon: this.state.addIcon,
  //
  render() {
      Icon.getImageSource('ios-add-circle-outline',30,'red')
          .then((source) => {this.state.addIcon = source});
      return (
        <NavigatorIOS ref="nav"
          style={styles.container}
          initialRoute={{
              component: this.renderGoalList.bind(this),
              title: 'Goals',
              passProps: { goals: this.props.goals },
              rightButtonTitle: 'Add',
              barTintColor: '#008cba',
              tintColor: '#ffffff',
              titleTextColor: '#ffffff',
              onRightButtonPress: () => {
                  this.refs.nav.push(
                    {title: 'Add',
                     component: AddGoalScene,
                     barTintColor: '#008cba',
                     tintColor: '#ffffff',
                     titleTextColor: '#ffffff',})
              },
          }}
        />
      );
    } // end render

    renderGoalList() {
      return (
        <View style={styles.content}>
           <Text>Goal Count = {this.props.goals.length}</Text>
            <ListView
               dataSource={ds.cloneWithRows(this.props.goals)}
               enableEmptySections={true}
               renderRow={(rowData) =>

                 <View style={styles.listItem}>
                   <TouchableHighlight style={{flex:1}} onPress={() => this.onGoalPress(rowData)}>
                      <Text style={styles.goalName}>
                        {rowData.name}
                      </Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.onRemoveGoalPress(rowData.id)}>
                      <Icon name="ios-remove-circle-outline" size={30} color="#000000" />
                    </TouchableHighlight>
                  </View>
               }
            />
          </View>
      );
    }// end renderGoalList
  }  // end GoalListScene class

  class GoalList extends Component {

    render() {
      // TODO: can ds be built outside render?
      goalListDataSource = {
        dataSource: ds.cloneWithRows(this.props.goals),
      };

      return (
        <View style={styles.content}>
           <Text>Goal Count = {this.props.goals.length}</Text>
            <ListView
               dataSource={ds.cloneWithRows(this.props.goals)}
               enableEmptySections={true}
               renderRow={(rowData) =>
                 <View style={styles.listItem}>
                    <Text style={styles.goalName}>
                      {rowData.name}
                    </Text>
                    <TouchableHighlight onPress={() => this.onRemoveGoalPress(rowData.id)}>
                      <Icon name="ios-remove-circle-outline" size={20} color="#000000" />
                    </TouchableHighlight>
                  </View>
               }
            />
          </View>
      )
    }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    paddingTop: 74,
    paddingBottom: 74,
  },
  listItem: {
    height: 50,
    margin:10,
    padding:15,
    backgroundColor: '#fafafa',
    borderColor:'black',
    borderWidth:1,
    borderRadius:5,
    flexDirection:'row',
  },
  goalName: {
    fontWeight: 'bold',
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    goals: state.goals,
  }
}

export default connect(mapStateToProps)(GoalListScene)
