import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Picker,
  Alert,

} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';

const options={
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with camera',
    chooseFromLibraryButtonTitle: 'choose photo from library',
}



export default class FarmerRegister extends Component<Props> {
    manualEntryFarmer(){
            Actions.manualEntryFarmer();

        }

       constructor(props){
           super(props);
           this.state={
               profPicUri:null,
               profPicName:null,
               IDUri:null,
               IDName:null,
               selectID:'pan',
           }
       }

       uploadImageClickedID=() => {
          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.uri };
              const fileName = {fileName:response.fileName};
              this.setState({
                IDUri : source,
                IDName : fileName
              });
            }
          });
       }


       uploadImageClickedProfPic=() => {
              ImagePicker.showImagePicker(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else {
                  const source = { uri: response.uri };
                  const fileName = {fileName:response.fileName};
                  this.setState({
                    profPicUri: source,
                    profPicName : fileName
                  });
                }
              });
           }

       register=()=> {

           console.log("entered in register");
            console.log(this.state.profPicUri);
           const data = new FormData();
           data.append('id_type', this.state.selectID);

           data.append('farmerPhoto',{
             uri: this.state.IDUri.uri,
             type: 'image/jpeg', // or photo.type
             name: this.state.IDName.fileName,
           });
            data.append('farmerPhoto',{
              uri: this.state.profPicUri.uri,
              type: 'image/jpeg', // or photo.type
              name: this.state.profPicName.fileName,
           });



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
            Alert.alert("Registered Successfully");
            Actions.microEntrepreneur();

       }
       render(){

           return(

                    <View style={styles.Container}>
                        <Text style={styles.textStyle}>Select the type of ID </Text>
                        <Picker
                        selectedValue={this.state.selectID}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                        this.setState({selectID: itemValue})}
                        itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
                        >
                        <Picker.Item label="Aadhar Card" value="aadhar" />
                        <Picker.Item label="Pan Card" value="pan" />
                        <Picker.Item label="Voter ID Card" value="voterID" />
                        </Picker>

                        <TouchableOpacity style={styles.uploadButton}
                        onPress={this.uploadImageClickedID}>
                        <Text style={styles.buttonTextStyle}>Upload ID</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.uploadButton}
                        onPress={this.uploadImageClickedProfPic}>
                        <Text style={styles.buttonTextStyle}>Upload your image</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.registerButton }
                        onPress={this.register}>
                        <Text style={styles.buttonTextStyle}>Register</Text>
                        </TouchableOpacity>
                        <Image source={this.state.profPicUri} style={{width:100,height:100}} />
                        <TouchableOpacity
                        onPress={this.manualEntryFarmer}>
                        <Text style={styles.manualEntryLink}>Register farmer manually</Text>
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
   registerButton:{
      backgroundColor:'#00695c',
      width:150,
      height:40,
      justifyContent:'center',
      marginVertical:20,
      borderRadius:20,
      alignItems:'center',


   },
   manualEntryLink:{
      color:'#2F7DFD',
      fontSize:15,
   }

});
