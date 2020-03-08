
import React, {Component} from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity,TextInput,Alert } from 'react-native';

export default class manualFarmerEntry extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            aadharNumber:'',
            upiID:'',
            farmSize:'',
            farmLocation:'',
            education:'',

        }
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder='Name'
                    onChangeText={(name) => { this.setState({name:name})}}
                    placeholderTextColor='rgba(0,0,0,0.5)'
                 />
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder='Aadhar Number'
                    onChangeText={(aadharNumber) => { this.setState({ aadharNumber:aadharNumber})}}
                    keyboardType='numeric'
                    placeholderTextColor='rgba(0,0,0,0.5)'
                 />
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder='UPI'
                    onChangeText={(upiID) => { this.setState({ upiID: upiID})}}

                    placeholderTextColor='rgba(0,0,0,0.5)'
                 />
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                     onChangeText={(farmSize) => { this.setState({ farmSize: farmSize})}}

                    placeholder='Size of Farm'
                    placeholderTextColor='rgba(0,0,0,0.5)'
                 />
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder='Location of Farm'
                    onChangeText={(farmLocation) => { this.setState({ farmLocation:farmLocation})}}

                    placeholderTextColor='rgba(0,0,0,0.5)'
                 />
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder='Education'
                    onChangeText={(education) => { this.setState({education:education})}}
                    keyboardType='numeric'
                    placeholderTextColor='rgba(0,0,0,0.5)'
                 />

                 <TouchableOpacity style={styles.registerButton }
                     onPress={this.register}>
                     <Text style={styles.buttonTextStyle}>Register</Text>
                 </TouchableOpacity>
            </View>

        )


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
        width:200,
        height:35,
        marginVertical:10,
        //backgroundColor:'rgba(0,0,0,0.3)',
        borderRadius:25,
        paddingHorizontal:16,
        fontSize:13,
        borderWidth:2,
        borderColor:'#212121',
     },
      buttonTextStyle:{
          color:'#ffffff',
          fontSize:17,
          marginVertical:5,
        },
      registerButton:{
         backgroundColor:'#00695c',
         width:150,
         height:40,
         justifyContent:'center',
         marginVertical:20,
         borderRadius:20,
         alignItems:'center',


      },






})