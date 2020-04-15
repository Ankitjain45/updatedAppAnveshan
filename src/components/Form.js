import React ,{Component} from 'react';

import { StyleSheet, Text, View , StatusBar, TextInput,TouchableOpacity,Picker,} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Form extends Component {

    constructor(props){
        super(props);
        var views=[];
        var names=[];
        this.state={
            email:'',
            password:'',
            selectCategory:"none",
            view : views,
            name:names,
            nameText : '',
            id:null,
        }
        if(this.props.type==='Signup')
        {   names.push(<View>

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
                    </View>
                    );
                    this.setState({name : names});
            views.push(<View>
                    <Text style={styles.textStyle}>Please select your category </Text>


                              <Picker
                                 selectedValue={this.state.selectCategory}
                                 style={{height: 50, width: 200}}
                                 onValueChange={(itemValue, itemIndex) =>
                                   this.setState({selectCategory: itemValue})}
                                   itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
                                 >
                                 <Picker.Item label="Select category" value="none" />
                                 <Picker.Item label="Micro Entrepreneur" value="micro" />
                                 <Picker.Item label="Anveshan Team" value="team" />

                               </Picker>

                               </View>
                );
                this.setState({view : views})
        }
    }
  buttonPressed=()=>{
    if(this.props.type === 'Login')
    {
        console.log('Login Pressed');
        console.log(global.IP);
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
            if(response.user_type === "micro")
                {
                    Actions.microEntrepreneur({idValue : this.state.id});
                }
            else
                {
                    Actions.inventoryID({idValue : this.state.id});
                }
            });
    }
    else
    {
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
              user_type : this.state.selectCategory
            })
           })
           .then((response) => { return  response.json() } )
           .catch((error) => console.warn("fetch error:", error))
           .then((response) => {
           this.setState({id:response.id});
                console.log(JSON.stringify(response));

                if(this.state.selectCategory === 'micro')
                {
                    Actions.microEntrepreneur({idValue : this.state.id});
                }
                else
                {
                    Actions.inventoryID({idValue : this.state.id});
                }

            });
    }

  }

  render(){
    return (


            <View style={styles.container}>

            {this.state.name}
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
            {this.state.view}
            <TouchableOpacity style={styles.button}
               onPress={this.buttonPressed} >
              <Text style={styles.buttonText}>{this.props.type}</Text>
            </TouchableOpacity>
            </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
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


  }
});
