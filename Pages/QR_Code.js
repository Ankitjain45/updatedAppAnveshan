import React, {Component} from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity,TextInput,Alert,Slider } from 'react-native';
//import RNFetchBlob from 'rn-fetch-blob';

export default class QR_Code extends Component{
     constructor(props) {
        super(props);
        this.state={
            slideValue:0,
            containerID:'',

        }
     }
     print =() => {

//        RNFetchBlob
//          .config({
//            fileCache : true,
//            // by adding this option, the temp files will have a file extension
//            appendExt : 'png'
//          })
//          .fetch('GET', 'http://www.example.com/file/example.zip', {
//            //some headers ..
//          })
//          .then((res) => {
//            // the temp file path with file extension `png`
//            console.log('The file saved to ', res.path())
//            // Beware that when using a file path as Image source on Android,
//            // you must prepend "file://"" before the file path
//            imageView = <Image source={{ uri : Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path() }}/>
//          })


     }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>Enter the Container No.</Text>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder='Container Number'
                    placeholderTextColor='rgba(0,0,0,0.5)'
                    value={this.state.containerID}
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