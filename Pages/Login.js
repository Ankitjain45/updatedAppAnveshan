import React, {Component} from 'react';
import { StyleSheet, Text, View , StatusBar,TouchableOpacity,Image,TextInput,Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';


export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            id:null,
        };
     };
  Signup(){

          Actions.Signup();
      }
   Home(){
          Actions.Home();
      }
        buttonPressed=()=>{


              console.log('Login Pressed');

              fetch(global.IP+'/users/login',{
                  method : 'post',
                  headers: {
                            Accept: 'application/json',
                               'Content-Type': 'application/json',
                          },
                  body: JSON.stringify({
                    email: this.state.email,
                    password : this.state.password,
                  })
                 })
                 .then((response) => { return  response.json() } )
                 .catch((error) => console.warn("fetch error:", error))
                 .then((response) => {
                 this.setState({id:response.id});
                  if(response.message!= "Auth failed"){
                      if(response.user_type === "micro")
                          {
                              Actions.microEntrepreneur({idValue : this.state.id});
                          }
                      if(response.user_type==="team")
                          {
                              Actions.inventoryID({idValue : this.state.id});
                          }
                   }
                   else{
                        Alert.alert("Invalid credentials !");
                   }
                  });
          }
  render(){
    return(
      <View style={styles.container}>

      <Image source={require('../Images/anveshan_logo.jpg')}
       style={styles.logo}/>




            <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            textAlign='center'
            autoCompleteType='email'
            textContentType='emailAddress'
            placeholder='Email'
            placeholderTextColor='rgba(0,0,0,0.5)'
            selectionColor='#4f9a94'
            keyboardType='email-address'
            onChangeText={(email) => { this.setState({ email:email})}}
            />
            <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            textAlign='center'
            textContentType='password'
            placeholder='Password'
            placeholderTextColor='rgba(0,0,0,0.5)'
            selectionColor='#4f9a94'
            onChangeText={(password) => { this.setState({ password: password})}}
            secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button}
               onPress={this.buttonPressed} >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>


        <View style={styles.signupCont}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <TouchableOpacity
          onPress={this.Signup} >
            <Text style={styles.signUpLink}> Sign Up</Text>
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
    marginBottom:30,

  },
    inputBox:{
      width:300,
      height:50,
      marginVertical:7,
      alignItems:'center',
      //backgroundColor:'rgba(0,0,0,0.3)',
      borderRadius:5,
      paddingHorizontal:16,
      fontSize:13,
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.5)',
      justifyContent:'center',
      alignItems:'center',
    },
    button:{
        width:300,
        height:50,
        marginVertical:10,
        borderRadius:5,
        paddingHorizontal:16,
        paddingVertical:14,
        fontSize:13,
        backgroundColor:'#00bfa5',
        alignItems:'center',

    },
    textStyle:{
        fontSize:17,
        fontWeight:'bold',
        marginTop:10,


    },
  buttonText:{
    color:'#ffffff',
    fontSize:17,
    fontWeight:'bold',


  },
    signUpLink:{
        color:'#00bfa5',
        fontSize:13,
    },
  signupCont:{
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:16,
    flexDirection:'row',
  },
  signupText:{
    fontSize:13,
    color:'rgba(0,0,0,0.7)',
  },

});
