import React, {Component} from 'react';
import { StyleSheet, Text, View , StatusBar,TouchableOpacity,Image,ScrollView,TextInput,Picker,Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';


export default class Signup extends Component {
   Login(){
      Actions.Login();
   }
   constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            selectCategory:"none",
            nameText : '',
            invID:null,
            id:null,
            inventoryList:[],
        };
                fetch(global.IP+'/unit/list',{
                    method : 'get'
                    }).then((response) => { return  response.json() } )
                       .catch((error) => console.warn("fetch error:", error))
                       .then((response) => {
                       console.log(response.list);
                            this.setState({inventoryList : response.list});
                            console.log(this.state.inventoryList);
                            });

        }
  buttonPressed=()=>{
        if(this.state.selectCategory!= "none"){

            console.log('Signup Pressed '+ this.state.selectCategory);

            fetch(global.IP+'/users/signup',{
                method : 'post',
                headers: {
                          Accept: 'application/json',
                             'Content-Type': 'application/json',
                        },
                body: JSON.stringify({
                  name:this.state.nameText,
                  email: this.state.email,
                  password : this.state.password,
                  user_type : this.state.selectCategory,
                  invID:this.state.invID,
                })
               })
               .then((response) => { return  response.json() } )
               .catch((error) => console.warn("fetch error:", error))
               .then((response) => {console.log(response);
               console.log(this.state.invID);
               this.setState({id:response.id});
                    console.log(JSON.stringify(response));

                    if(this.state.selectCategory === 'micro')
                    {
                        Actions.microEntrepreneur({idValue : this.state.id});
                    }
                    else
                    {   console.log(this.state.invID);
                        Actions.TeamAnveshan({idValue : this.state.id,invID:this.state.invID,email:this.state.email});
                    }

                });
            }
        else{
                Alert.alert("Please select your category");
        }

  }
        render(){
            return(
                <ScrollView>
                    <View style={styles.container}>

                        <Image source={require('../Images/anveshan_logo.jpg')}
                        style={styles.logo}/>

                        <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder='Username'
                        placeholderTextColor='rgba(0,0,0,0.5)'
                        textAlign='center'
                        autoCompleteType='name'
                        textContentType='name'
                        selectionColor='#4f9a94'
                        onChangeText={(name) => { this.setState({ nameText: name})}}
                        />
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

                        <Picker
                        selectedValue={this.state.selectCategory}
                        style={{height: 50, width: 300,color:'rgba(0,0,0,0.8)'}}
                        onValueChange={(itemValue, itemIndex) =>
                        this.setState({selectCategory: itemValue})}

                        >
                        <Picker.Item label="Select category" value="none" />
                        <Picker.Item label="Micro Entrepreneur" value="micro" />
                        <Picker.Item label="Anveshan Team" value="team" />

                        </Picker>

                        <Picker
                        selectedValue={this.state.invID}
                        mode="dropdown"
                        style={{height: 50, width: 300,color:'rgba(0,0,0,0.8)'}}
                        onValueChange={(itemValue, itemIndex) =>
                        this.setState({invID: itemValue})}
                        >
                        <Picker.Item label="Select Inventory" value="none" />
                        {this.state.inventoryList.map((item, index) => {
                                return (<Picker.Item label={item.name} value={item._id} />)
                            })}
                        </Picker>

                        <TouchableOpacity style={styles.button}
                        onPress={this.buttonPressed} >
                        <Text style={styles.buttonText}>SignUp</Text>
                        </TouchableOpacity>

                        <View style={styles.signupCont}>

                        <Text style={styles.signupText}>Already have an account?</Text>
                        <TouchableOpacity style={styles.signupButton}
                        onPress={this.Login} >
                        <Text style={styles.signUpLink}> Login</Text>
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
  buttonText:{
    color:'#ffffff',
    fontSize:17,
    fontWeight:'bold',


  },
  signupCont:{
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:15,
    flexDirection:'row',
  },
  signupText:{
   fontSize:13,
   color:'rgba(0,0,0,0.7)',
  },
  textStyle:{
      fontSize:17,
      fontWeight:'bold',
      marginTop:10,


  },
  button:{
      width:300,
      height:50,
      marginTop:15,
      marginBottom:10,
      borderRadius:5,
      paddingHorizontal:16,
      paddingVertical:14,
      fontSize:13,
      backgroundColor:'#00bfa5',
      alignItems:'center',

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
  signUpLink:{
        color:'#00bfa5',
        fontSize:13,
    },
  signupButton:{
    fontSize:16,
    fontWeight:'bold',
    color:'rgba(0,0,0,0.7)',
  },

  logo:{
    width:140,
    height:140,
    marginTop:70,
    marginBottom:30,

  }
});
