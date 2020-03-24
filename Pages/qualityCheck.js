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

const options={
    title: 'Quality Check',
    takePhotoButtonTitle: 'Take photo with camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}



export default class qualityCheck extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            avatarSource : null,
            fileName : null,
            invID : props.invID,
            bottleID:'',
            contentUri:null,
            contentName:null,
            IDName:null,
            IDUri:null,
        }
    }

    uploadIDImageClicked=() => {
       ImagePicker.showImagePicker(options, (response) => {
         console.log('Response = ', response);

         if (response.didCancel) {
           console.log('User cancelled image picker');
         } else if (response.error) {
           console.log('ImagePicker Error: ', response.error);
         } else {
           const source = { uri: response.uri };
            const fileName = {fileName : response.fileName};
            this.setState({
                IDUri : source,
                IDName : fileName
            });
         }
       });
    }
    uploadContentImageClicked=() => {
       ImagePicker.showImagePicker(options, (response) => {
         console.log('Response = ', response);

         if (response.didCancel) {
           console.log('User cancelled image picker');
         } else if (response.error) {
           console.log('ImagePicker Error: ', response.error);
         } else {
           const source = { uri: response.uri };
            const fileName = {fileName : response.fileName};
            this.setState({
                contentUri : source,
                contentName : fileName
            });
         }
       });
    }


    update=()=> {
                if(this.state.contentUri != null)
                {
                const data = new FormData();
                data.append('Quality_Check', {
                  uri: this.state.contentUri.uri,
                  type: 'image/jpeg', // or photo.type
                  name: this.state.contentName.fileName,
                });
                fetch(global.IP+'/bottles/'+this.state.invID+'/'+this.state.bottleID, {
                  method: 'patch',
                  body: data,
                }).then(response=> {
                if(response.status===200 || response.status===201  )
                    Alert.alert("Submitted successfully")
                 else
                    Alert.alert("Submission Failed")
                     } )
                .catch((error) => console.warn("fetch error:", error));
                }
                else
                {
                    Alert.alert("Please upload a Content Photo");
                }
            }

    render(){
        return(

                <View style={styles.Container}>
                    <Text style={styles.textStyle}>Take photo of Bottle ID</Text>

                     <TouchableOpacity style={styles.uploadButton}
                        onPress={this.uploadIDImageClicked}>
                        <Text style={styles.buttonTextStyle}>Upload Bottle ID</Text>
                     </TouchableOpacity>
                     <Text style={{color:'rgba(0,0,0,0.5)',marginVertical:20}}>or</Text>
                    <Text style={styles.textStyle}>Enter the Bottle ID manually</Text>
                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder='Bottle ID'
                        placeholderTextColor='rgba(0,0,0,0.5)'
                        onChangeText={(bottleID) => { this.setState({ bottleID: bottleID})}}
                        keyboardType='numeric'
                     />
                     <Text style={styles.textStyle}>Take photo of Bottle Contents</Text>
                     <TouchableOpacity style={styles.uploadButton}
                        onPress={this.uploadContentImageClicked}>
                        <Text style={styles.buttonTextStyle}>Take photo</Text>
                     </TouchableOpacity>

                     <TouchableOpacity style={styles.updateButton }
                         onPress={this.update.bind(this)}>
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
      fontSize:17,

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
         marginTop:40,
         borderRadius:20,
         alignItems:'center',


      }

});
