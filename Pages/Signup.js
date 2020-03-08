import React, {Component} from 'react';
import { StyleSheet, Text, View , StatusBar} from 'react-native';

import Form from '../src/components/Form';
export default class Signup extends Component {
  render(){
    return(
      <View style={styles.container}>
        <Form type="Signup"/>
        <View style={styles.signupCont}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <Text style={styles.signupButton}> Sign In</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupCont:{
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical:16,
    flexDirection:'row',
  },
  signupText:{
    fontSize:16,
    color:'rgba(0,0,0,0.5)',
  },
  signupButton:{
    fontSize:16,
    fontWeight:'bold',
    color:'rgba(0,0,0,0.7)',
  }
});
