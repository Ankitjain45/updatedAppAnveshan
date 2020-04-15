import React, {Component} from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity,TextInput,Alert,Slider, } from 'react-native';
import NumericInput from 'react-native-numeric-input';

export default class updateInventory extends Component{
     constructor(props) {
        super(props);

        this.state={
            containerID:'',
            quantity:0,
            reason:'',
            invID : props.invID,
        }
     }
     update =() => {

        console.log(this.state.quantity);
        console.log(this.state.reason);
            const data = new FormData();
             // you can append anyone.
            data.append('number', this.state.containerID);
            data.append('newQuantity',  this.state.quantity);
            data.append('invID', this.state.invID);
            data.append('reason', this.state.reason);

            fetch(global.IP+'/inventory/'+this.state.invID+'/'+this.state.containerID+'/', {
              method: 'patch',
              body: data,
            }).then(res => {
              console.log(res)
            });

        Alert.alert("Updated Successfully")
     }
    render(){
        return(

                <View style={styles.container}>
                    <Text style={styles.textStyle}>Enter the Container No.</Text>
                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder='Container Number'
                        placeholderTextColor='rgba(0,0,0,0.5)'
                        onChangeText={(containerID) => { this.setState({ containerID: containerID})}}
                     />
                     <Text style={styles.textStyle}>Update the quantity in Liters</Text>
                     <NumericInput
                         onChange={quantity => this.setState({quantity})}
                         onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                         totalWidth={240}
                         totalHeight={50}
                         iconSize={25}
                         step={1}
                         valueType='real'
                         rounded
                         textColor='#B0228C'
                         iconStyle={{ color: 'white' }}
                         rightButtonBackgroundColor='#00695c'
                         leftButtonBackgroundColor='#00695c'
                     />

                     <Text style={styles.textStyle}>Please enter the reason</Text>
                     <TextInput style={styles.reasonInputBox}
                         underlineColorAndroid='rgba(0,0,0,0)'
                         placeholder='Reason'
                         placeholderTextColor='rgba(0,0,0,0.5)'
                         selectionColor='#4f9a94'
                         multiline={true}
                         onChangeText={(reason) => { this.setState({ reason:reason})}}
                      />
                     <TouchableOpacity style={styles.updateButton }
                         onPress={this.update}>
                         <Text style={styles.buttonTextStyle}>Update</Text>
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
     textStyle:{
        fontSize:20,
        fontWeight:'bold',
        marginVertical:10,
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
        textAlignVertical:'top',
     },
    reasonInputBox:{
        width:220,
        height:90,
        marginVertical:10,
        //backgroundColor:'rgba(0,0,0,0.3)',
        borderRadius:15,
        paddingHorizontal:16,
        fontSize:13,
        borderWidth:1,
        borderColor:'#212121',
        textAlignVertical:'top',
     },

      buttonTextStyle:{
          color:'#ffffff',
          fontSize:17,
          marginVertical:5,
        },
   updateButton:{
         backgroundColor:'#00695c',
         width:150,
         height:40,
         justifyContent:'center',
         marginTop:40,
         borderRadius:20,
         alignItems:'center',


      }

})