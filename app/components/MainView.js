import React, { Component, PropTypes } from 'react';
import { AppRegistry, NavigatorIOS, View, TabBarIOS, Text, TouchableHighlight, StatusBar, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GoalListScene from './goalListScene'
import SettingsScene from './settingsScene'
import TodayScene from './todayScene'
import AddGoalScene from './addGoalScene'
import LoginScene from './loginScene'

export default class MainView extends Component {

  state = {
    selectedTab: 'GoalsTab',
    notifCount: 0,
    presses: 0,
  };

  render() {
    // Icon.getImageSource('ios-add-circle-outline',30,'red')
    //     .then((source) => {this.state.addIcon = source});

    return (
      <View style={{flex:1}}>
        <StatusBar
         backgroundColor="blue"
         barStyle="light-content"
       />
      <TabBarIOS style={styles.container}
        unselectedTintColor="#cecece"
        tintColor="white"
        unselectedItemTintColor="#cecece"
        barTintColor="#008cba"
        selectedTab={this.state.selectedTab}>

        <Icon.TabBarItemIOS
          title="Goals"
          iconName="ios-list-box-outline"
          selectedIconName="ios-list-box"
          iconColor="#cecece"
          selectedIconColor="#ffffff"
          renderAsOriginal
          selected={this.state.selectedTab === 'GoalsTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'GoalsTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          <GoalListScene/>
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          title="Settings"
          iconName="ios-settings-outline"
          selectedIconName="ios-settings"
          iconColor="#cecece"
          selectedIconColor="#ffffff"
          renderAsOriginal
          selected={this.state.selectedTab === 'SettingsTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'SettingsTab',
              presses: this.state.presses + 1
            });
          }}>
          <SettingsScene/>
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    </View>

    );
  }
}

// style samples at https://bootswatch.com
// current colors from YETI: https://bootswatch.com/yeti/
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    paddingTop: 74,
  },
  scene: {
    backgroundColor: '#ffffff',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});
