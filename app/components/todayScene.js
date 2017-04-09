import React, { Component } from 'react';
import {SegmentedControlIOS,StyleSheet,Text,View} from 'react-native'

class TodayScene extends Component {

  render() {
    return (
      <View style={styles.content}>
        <View style={{height:73,padding:10,paddingTop:30,backgroundColor:'#008cba'}}>
          <SegmentedControlIOS
            values={['Today', 'This Week', 'All']}
            selectedIndex={0}
            tintColor='#ffffff'
          />
        </View>
        <View style={{margin:20}}>
         <Text>THIS IS MY TODAY SCENE.</Text>
         <Text>Well, it will be.</Text>
       </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default TodayScene
