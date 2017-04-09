import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({

  textInputStyle: {
    height: 30,
    width: 300,
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  loginButton: {
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#008cba',
    borderRadius: 4
  },
  loginButtonTextStyle: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  inputContainer: {
    height: 30,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#ababab'
  },
  buttonContainer: {
    height: 50,
    flexDirection: 'column',
    margin: 15,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
});
