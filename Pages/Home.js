import React,{Component} from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity } from 'react-native';

import {Actions} from 'react-native-router-flux';



export default class Home extends Component {

    microEntrepreneur(){
        Actions.microEntrepreneur();
    }
    inventoryID(){
        Actions.inventoryID();
    }

    render(){

        return(
            <View style={styles.Container}>
                  <TouchableOpacity style={styles.buttonStyle}
                    onPress={this.microEntrepreneur} >
                    <Text style={styles.textStyle}>Micro Entrepreneur </Text>
                   </TouchableOpacity>

                  <TouchableOpacity style={styles.buttonStyle}
                    onPress={this.inventoryID} >
                    <Text style={styles.textStyle}>Team Anveshan</Text>
                   </TouchableOpacity>

            </View>
        )
    }

}

const styles = StyleSheet.create({

  Container: {
    backgroundColor: '#ffffff',
    flexGrow:1,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonStyle:{
    backgroundColor:'#439889',
    width:200,
         height:55,
         marginVertical:10,
         borderRadius:15,
         justifyContent:'center',
         alignItems:'center',
  },
  textStyle:{
     color:'#ffffff',
     fontSize:20,
     marginVertical:5,
     fontWeight:'bold',
  }
})