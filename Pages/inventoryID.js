import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default class inventoryID extends Component {
    constructor(props) {
            super(props);
            this.state={
                idValue:'',

            }
         }
    inventoryID=()=>{


    }

    render(){
        return(
            <View>
                <Text>Please enter the Inventory ID</Text>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder='Inventory ID'
                    placeholderTextColor='rgba(0,0,0,0.5)'
                    keyboardType='numeric'
                    value={this.state.idValue}
                 />
                 <TouchableOpacity style={styles.button}
                    onPress={inventoryID} >
                   <Text style={styles.buttonText}>Enter</Text>
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
   button:{
     width:200,

     marginVertical:10,
     borderRadius:25,
     backgroundColor:'#212121',
     paddingVertical:10,
     alignItems:'center',

   },
   buttonText:{
     color:'#ffffff',
     fontSize:17,


   }



 })