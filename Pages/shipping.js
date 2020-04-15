import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';

const options={
    title: 'Order ID',
    takePhotoButtonTitle: 'Take photo with camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}



export default class shipping extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            avatarSource:null,
            caller : 'order',
            IDname:null,
            IDuri:"",
            orderID:null,
        }
    }


    uploadImageClicked=() => {
       ImagePicker.showImagePicker(options, (response) => {
         console.log('Response = ', response);

         if (response.didCancel) {
           console.log('User cancelled image picker');
         } else if (response.error) {
           console.log('ImagePicker Error: ', response.error);
         } else {
           const source = { uri: response.uri };
            const fileName = {fileName : response.fileName };
           this.setState({
             IDuri: source,
             IDname : fileName,
           });
           console.log(this.state.IDuri.uri);
         }
       });
    }



    upload=()=> {

            console.log(this.state.orderID);
           const data = new FormData();

           if(this.state.orderID===null){
           data.append('orderIDphoto',{
             uri: this.state.IDuri.uri,
             type: 'image/jpeg', // or photo.type
             name: this.state.IDname.fileName,
           });
           }
           else{
            data.append('orderid',this.state.orderID);
           }

           fetch(global.IP+'/farmers/registration',{
             method: 'post',
             body : data,
             headers: {'Content-Type':'multipart/form-data'}
           }).then(res => {
             res.json().then(json=>{
             console.log(data);
             });
           })
           .catch(function(error) {
               console.log("errorMessage: " + error.message);
               throw error;
           });

                 Actions.orderPage({orderID:this.state.orderID});
            }

    render(){
        return(

            <View style={styles.Container}>

                    <Text style={styles.textStyle}>Enter the Order ID manually</Text>
                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder='Order ID'
                        placeholderTextColor='rgba(0,0,0,0.5)'
                        onChangeText={(orderID) => { this.setState({ orderID: orderID})}}
                     />
                 <Text style={{color:'rgba(0,0,0,0.5)',marginVertical:20}}>- OR -</Text>
                 <Text style={styles.textStyle}>Click image of Order ID</Text>
                 <TouchableOpacity style={styles.uploadImageButton}
                    onPress={this.uploadImageClicked}>
                    <Text style={styles.buttonTextStyle}>Click image</Text>
                 </TouchableOpacity>

                 <TouchableOpacity style={styles.uploadButton }
                     onPress={this.upload}>
                     <Text style={styles.buttonTextStyle}>Upload</Text>
                 </TouchableOpacity>
      <Image source={{uri: this.state.IDuri.uri}}

       style={styles.logo}/>
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
   uploadImageButton:{
     backgroundColor: '#439889',
     width:200,
     height:35,
     marginVertical:10,
     borderRadius:25,
     alignItems:'center',

   },
     logo:{
       width:150,
       height:150,
       marginTop:150,
       marginBottom:30,

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
   buttonTextStyle:{
     color:'#ffffff',
     fontSize:17,
     marginVertical:5,


   },
   uploadButton:{
         backgroundColor:'#00695c',
         width:150,
         height:40,
         justifyContent:'center',
         marginVertical:20,
         borderRadius:20,
         alignItems:'center',


      }

});
