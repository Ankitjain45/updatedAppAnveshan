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

const options={
    title: 'Quality Check',
    takePhotoButtonTitle: 'Take photo with camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}



export default class qualityCheckMultiple extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            avatarSource:null,
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

           this.setState({
             avatarSource: source,
           });
         }
       });
    }

    update=()=> {
                const data = new FormData();
                data.append('name', 'testName'); // you can append anyone.
                data.append('photo', {
                  uri: source,
                  type: 'image/jpeg', // or photo.type
                  name: fileName,
                });
                /*fetch('localhost:3000/inventory/', {
                  method: 'post',
                  body: data,
                }).then(res => {
                  console.log(res)
                });*/


            }

    render(){
        return(

                <View style={styles.Container}>
                    <Text style={styles.textStyle}>Quality Check</Text>

                     <TouchableOpacity style={styles.uploadButton}
                        onPress={this.uploadImageClicked}>
                        <Text style={styles.buttonTextStyle}>Upload Image</Text>
                     </TouchableOpacity>

                     <TouchableOpacity style={styles.updateButton }
                         onPress={this.update}>
                         <Text style={styles.buttonTextStyle}>Check Quality</Text>
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
   uploadButton:{
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
         marginVertical:20,
         borderRadius:20,
         alignItems:'center',


      }

});
