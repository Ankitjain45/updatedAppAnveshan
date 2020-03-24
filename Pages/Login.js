import React, {Component} from 'react';
import { StyleSheet, Text, View , StatusBar,TouchableOpacity,Image} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Form from '../src/components/Form';
export default class Login extends Component {
  Signup(){

          Actions.Signup();
      }
   Home(){
          Actions.Home();
      }
  render(){
    return(
      <View style={styles.container}>

      <Image source={require('../Images/anveshan_logo.jpg')}
       style={styles.logo}/>

        <Form type="Login"/>
        <View style={styles.signupCont}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <TouchableOpacity style={styles.signupButton}
          onPress={this.Signup} >
            <Text> Sign Up</Text>
           </TouchableOpacity>

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
  logo:{
    width:150,
    height:150,
    marginTop:150,
    marginBottom:10,

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
