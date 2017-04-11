import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AsyncStorage, Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import * as actions from '../actions';
import s from '../ChainstayStyles.js';

class LoginScene extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;
    const {user} = this.props;

    this.setState({ error: '', loading: true });

    if ( user.newUser ) {
      // TODO: auto-creating account, but need actual registration
      // TODO: add a recovery mechanism as well
      let newUser = {
        email: email,
        password: password,
        isLoggedIn: true,
      };

      AsyncStorage.setItem('user',JSON.stringify(newUser),(err) => {
        this.onLoginSuccess();
        this.props.dispatch(actions.userLoaded(newUser));
      })

    } else if ( user.newUser
            || (user.email == email && user.password == password)
            || (user.email == null & user.password == null) ) {
      this.onLoginSuccess();

    } else {
      this.onLoginFail();
    }
  }

  onLoginFail() {
    this.setState({ error: '** Authentication Failed **', loading: false });
  }

  onLoginSuccess() {
    AsyncStorage.mergeItem('user',JSON.stringify({isLoggedIn:true}),(err) => {
      if (err) {
        console.log(err);
        AlertIOS.alert(err.message);
        return;
      }
      this.setState({
        password: '',
        loading: false,
        error: ''
      });
      this.props.dispatch(actions.loginComplete());
    })

  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <View style={{flex:1}}>

          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={styles.title}>CHAINSTAY</Text>
            <Image
              style={{width: 299, height: 213, marginBottom: 70}}
              source={require('../../img/bike-frame-md-blue.png')} />
          </View>

          <View style={{flex:1}}>
            <View style={s.inputContainer}>
              <Icon name="ios-person-outline" size={30} color="#000000" />
              <TextInput style={s.textInputStyle}
                placeholder="user@gmail.com"
                label="Email"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </View>

            <View style={s.inputContainer}>
              <Icon name="ios-lock-outline" size={30} color="#000000" />
              <TextInput style={s.textInputStyle}
                secureTextEntry
                placeholder="password"
                label="Password"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </View>


            <View style={s.buttonContainer}>
              <Text style={styles.errorTextStyle}>
                {this.state.error}
              </Text>
              <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={s.loginButton}>
                <Text style={s.loginButtonTextStyle}>
                  Log In
                </Text>
              </TouchableOpacity>

            </View>

          </View>

    </View>
    );
  }
}

const styles = {
  title: {
    color: '#008cba',
    fontSize: 36,
    marginBottom: 15,
    marginTop: 100,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
    backgroundColor: 'transparent'
  },
  bg: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
  },



};

const mapStateToProps = (state) => {
  return {
    user: state.session
  }
}

export default connect(mapStateToProps)(LoginScene)
