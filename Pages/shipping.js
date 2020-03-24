import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
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
            fileName : null

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
            const file = {fileName : response.uri };
           this.setState({
             avatarSource: source,
             fileName : file
           });
         }
       });
    }



    upload=()=> {

                const data = new FormData();
                data.append('name', 'testName'); // you can append anyone.
                data.append('photo', {
                  uri: this.state.avatarSource.uri,
                  type: 'image/jpeg', // or photo.type
                  name: this.state.fileName.fileName,
                });
                /*fetch('localhost:3000/inventory/', {
                  method: 'post',
                  body: data,
                }).then(res => {
                  console.log(res)
                });*/

                 Actions.orderPage({call : 'orderID'});
            }

    render(){
        return(

            <View style={styles.Container}>
                <Text style={styles.textStyle}>Shipping</Text>

                 <TouchableOpacity style={styles.uploadImageButton}
                    onPress={this.uploadImageClicked}>
                    <Text style={styles.buttonTextStyle}>Order ID image</Text>
                 </TouchableOpacity>

                 <TouchableOpacity style={styles.uploadButton }
                     onPress={this.upload}>
                     <Text style={styles.buttonTextStyle}>Upload</Text>
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
   uploadImageButton:{
     backgroundColor: '#439889',
     width:200,
     height:35,
     marginVertical:10,
     borderRadius:25,
     alignItems:'center',

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
