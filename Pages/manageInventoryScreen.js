import React,{Component} from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity,} from 'react-native';

import {Actions} from 'react-native-router-flux';



export default class manageInventoryScreen extends Component {
    QR_Code(){
            Actions.QR_Code();
        }
    updateInventory(){
            Actions.updateInventory();
        }
    qualityCheckMultiple(){
            Actions.qualityCheckMultiple();
        }

    render(){
        return(

                <View style={styles.Container}>
                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.QR_Code} >
                        <Text style={styles.textStyle}>Generate QR</Text>
                       </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.updateInventory} >
                        <Text style={styles.textStyle}>Update Inventory</Text>
                       </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.qualityCheckMultiple} >
                        <Text style={styles.textStyle}>Quality Check</Text>
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