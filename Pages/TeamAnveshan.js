import React,{Component} from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native';

import {Actions} from 'react-native-router-flux';



export default class Home extends Component {
    constructor(props) {
                super(props);
                console.log('Changed'+ props.invID+' '+props.email);
                this.state={
                    idValue : props.invID,
                    email: props.email,
                }


             }
    manage_inventory(){
        Actions.manageInventory({invID : this.state.idValue,email:this.state.email});
    }
    receive_inventory(){
        Actions.QR_receive({invID : this.state.idValue});
    }
    quality_check(){
        Actions.QR_quality({invID : this.state.idValue});
    }
    shipping(){
        Actions.shipping({invID : this.state.idValue});
    }

    render(){

        return(

                <View style={styles.Container}>

                      <View style={styles.category}>
                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.manage_inventory.bind(this)} >
                        <Text style={styles.textStyle}>Manage Inventory</Text>
                       </TouchableOpacity>
                             <Image source={require('../Images/boxes_icon_trans.png')}
                              style={styles.icon}/>
                       </View>

                      <View style={styles.category}>
                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.receive_inventory.bind(this)} >
                        <Text style={styles.textStyle}>Receive Inventory</Text>
                       </TouchableOpacity>
                             <Image source={require('../Images/box-and-hand_icon_trans.png')}
                              style={styles.icon}/>
                       </View>

                      <View style={styles.category}>
                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.quality_check.bind(this)} >
                        <Text style={styles.textStyle}>Quality Check</Text>
                       </TouchableOpacity>
                             <Image source={require('../Images/premium_icon_trans.png')}
                              style={styles.icon}/>
                       </View>

                      <View style={styles.category}>
                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.shipping.bind(this)} >
                        <Text style={styles.textStyle}>Shipping</Text>
                       </TouchableOpacity>
                        <Image source={require('../Images/truck_icon_trans.png')}
                        style={styles.icon}/>
                       </View>


                </View>

        )
    }

}

const styles = StyleSheet.create({

  Container: {
    backgroundColor: '#ffffff',
    flexGrow:1,
    alignItems:'center',
    paddingTop:30,
  },
  icon:{
    width:150,
    height:150,
    marginLeft:20,
//    marginTop:60,
//    marginBottom:10,


  },
  category:{

    backgroundColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    marginVertical:10,
    height:110,
    width:320,
    borderRadius:5,
    flexDirection:'row',
  },

    textStyle:{
        fontSize:13,
        fontWeight:'bold',
        color:'#ffffff'
        //marginVertical:10,


    },
    buttonStyle:{
        backgroundColor:'#00bfa5',
        width:140,
        height:35,
        marginLeft:30,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
    },

})