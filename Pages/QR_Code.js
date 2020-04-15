import React, {Component} from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity,TextInput,Alert,Slider, } from 'react-native';
//import RNFetchBlob from 'rn-fetch-blob';

export default class QR_Code extends Component{
     constructor(props) {
        super(props);
        console.log(props.email);
        this.state={
            slideValue:0,
            containerID:'',
            email:props.email,

        }
     }
     print =() => {
                   const data = new FormData();
                    // you can append anyone.
                   data.append('number', this.state.containerID);
                   data.append('invID', this.state.invID);
                   data.append('to_mail_id', this.state.email);
                   data.append('qrQuantity', this.state.sliderValue);

                   fetch(global.IP+'/inventory/'+this.state.invID+'/'+this.state.containerID+'/', {
                     method: 'post',
                     body: data,
                   }).then(res => {
                     console.log(res)
                   });

               Alert.alert("QR codes mailed successfully to "+this.state.email);

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

                     <Text style={styles.textStyle} > Number of QR Codes : {this.state.slideValue}</Text>
                     <Slider style={{width:"60%"}} step={1} maximumValue={100} value={this.state.slideValue} onValueChange={(slideValue) => this.setState({slideValue})} />


                     <TouchableOpacity style={styles.registerButton }
                         onPress={this.print}>
                         <Text style={styles.buttonTextStyle}>Print QR Codes</Text>
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
     },
      buttonTextStyle:{
          color:'#ffffff',
          fontSize:17,
          marginVertical:5,
        },
     registerButton:{
        backgroundColor:'#00695c',
        width:150,
        height:40,
        justifyContent:'center',
        marginVertical:20,
        borderRadius:20,
        alignItems:'center',


     },
})