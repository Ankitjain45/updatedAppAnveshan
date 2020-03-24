import React,{Component} from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity, } from 'react-native';

import {Actions} from 'react-native-router-flux';



export default class microEntrepreneur extends Component {
    constructor(props) {
            super(props);

            this.state = {
            id:props.idValue,
            }
     }

    farmer_registration(){
        Actions.FarmerRegister();
    }

    bags(){
    console.log("Here"+this.state.id);
        Actions.bags({idValue:this.state.id});
    }


    render(){

        return(

                <View style={styles.container}>

                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.farmer_registration} >
                        <Text style={styles.textStyle}>Register Farmer </Text>
                       </TouchableOpacity>

                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.bags.bind(this)} >
                        <Text style={styles.textStyle}>Receive bags</Text>
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
    textStyle:{
        fontSize:20,
        fontWeight:'bold',
        marginVertical:10,


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

})