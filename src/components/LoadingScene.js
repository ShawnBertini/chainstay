import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ActivityIndicator, Image, Text, View } from 'react-native';
import Dimensions from 'Dimensions';
import * as actions from '../actions';

class LoadingScene extends Component {
  state={animating:true};

  render() {
    return (
      <Image style={styles.bg} source={require('../../img/login-background.png')}>
        <View style={styles.activityContainerStyle}>
          <Text style={{alignSelf:'center',marginBottom:10}}>LOADING</Text>
          <ActivityIndicator
            animating={this.state.animating}
            size="large"
          />
        </View>
      </Image>
    );
  }
}

const styles = {
  bg: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
  },
  activityContainerStyle: {
    marginTop: 150,
    backgroundColor: 'transparent'
  }
};

// const mapStateToProps = (state) => {
//   return {
//     user: state.session
//   }
// }
//
// export default connect(mapStateToProps)(LoadingScene)
export default LoadingScene
