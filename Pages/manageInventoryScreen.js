import React,{Component} from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity,Image} from 'react-native';

import {Actions} from 'react-native-router-flux';



export default class manageInventoryScreen extends Component {
    constructor(props) {
            super(props);

            console.log(props.invID);
            this.state = {
              invID : props.invID,
              email : props.email,
              }
     };

    QR_Code(){
            Actions.receiveInventory({invID : this.state.invID,email:this.state.email});
        }
    updateInventory(){
            Actions.updateInventory({invID : this.state.invID});
        }
    qualityCheckMultiple(){
            Actions.qualityCheckMultiple({invID : this.state.invID});
        }

    render(){
        return(

                <View style={styles.Container}>
                <View style={styles.category}>
                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.updateInventory.bind(this)} >
                        <Text style={styles.textStyle}>Update Inventory</Text>
                       </TouchableOpacity>
                             <Image source={require('../Images/boxes_icon_trans.png')}
                              style={styles.icon}/>

                </View>

                <View style={styles.category}>
                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.QR_Code.bind(this)} >
                        <Text style={styles.textStyle}>Generate QR code</Text>
                       </TouchableOpacity>
                             <Image source={require('../Images/QR-code_icon_trans.png')}
                              style={styles.icon}/>

                </View>

                <View style={styles.category}>
                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.qualityCheckMultiple.bind(this)} >
                        <Text style={styles.textStyle}>Quality Check</Text>
                       </TouchableOpacity>
                             <Image source={require('../Images/premium_icon_trans.png')}
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
    marginVertical:5,
    height:100,
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
        marginLeft:25,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
    },
})