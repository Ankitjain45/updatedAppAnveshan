import React,{Component} from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity, } from 'react-native';

import {Actions} from 'react-native-router-flux';



export default class Home extends Component {
    constructor(props) {
                super(props);
                console.log('Changed'+ props.invID);
                this.state={
                    idValue : props.invID,

                }


             }
    manage_inventory(){
        Actions.manageInventory({invID : this.state.idValue});
    }
    receive_inventory(){
        Actions.receiveInventory({invID : this.state.idValue});
    }
    quality_check(){
        Actions.qualityCheck({invID : this.state.idValue});
//        Actions.qualityCheck({invID : this.state.idValue});
    }
    shipping(){
        Actions.shipping({invID : this.state.idValue});
    }

    render(){

        return(

                <View style={styles.Container}>

                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.manage_inventory.bind(this)} >
                        <Text style={styles.textStyle}>Manage Inventory</Text>
                       </TouchableOpacity>

                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.receive_inventory.bind(this)} >
                        <Text style={styles.textStyle}>Receive Inventory</Text>
                       </TouchableOpacity>

                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.quality_check.bind(this)} >
                        <Text style={styles.textStyle}>Quality Check</Text>
                       </TouchableOpacity>

                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.shipping.bind(this)} >
                        <Text style={styles.textStyle}>Shipping</Text>
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