import React,{Component} from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native';

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
                <View style={styles.category}>

                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.farmer_registration} >
                        <Text style={styles.textStyle}>Register Farmer </Text>
                       </TouchableOpacity>
                             <Image source={require('../Images/user_icon_trans.png')}
                              style={styles.icon}/>


                </View>
                <View style={styles.category}>
                      <TouchableOpacity style={styles.buttonStyle}
                        onPress={this.bags.bind(this)} >
                        <Text style={styles.textStyle}>Receive bags</Text>
                       </TouchableOpacity>
                             <Image source={require('../Images/wheatBag.png')}
                              style={styles.icon}/>

                </View>

             </View>

        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingTop:30,
    //justifyContent: 'center',
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