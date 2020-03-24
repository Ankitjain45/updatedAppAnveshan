import React, {Component} from 'react';
import { StyleSheet, Text, View , StatusBar,TouchableOpacity,Image,ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Form from '../src/components/Form';
export default class Signup extends Component {
   Login(){
      Actions.Login();
   }

  render(){
    return(
        <ScrollView>
              <View style={styles.container}>

                 <Image source={require('../Images/anveshan_logo.jpg')}
                       style={styles.logo}/>

                <Form type="Signup"/>
                <View style={styles.signupCont}>
                  <Text style={styles.signupText}>Already have an account?</Text>
                  <TouchableOpacity style={styles.signupButton}
                    onPress={this.Login} >
                      <Text> Sign In</Text>
                   </TouchableOpacity>
                </View>
              </View>
         </ScrollView>
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
  },

  logo:{
    width:140,
    height:140,
    marginTop:50,
    marginBottom:10,

  }
});
