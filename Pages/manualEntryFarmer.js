
import React, {Component} from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity,TextInput,Alert } from 'react-native';

export default class manualFarmerEntry extends Component{
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder='Name'
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
        fontSize:17,
        borderWidth:2,
        borderColor:'#212121',
     },
      buttonTextStyle:{
          color:'#ffffff',
          fontSize:17,
          marginVertical:5,
        },






})