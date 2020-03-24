import React, { Component } from "react";
import { StyleSheet, Text, View,TouchableOpacity,Alert,Slider, } from "react-native";
import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';

const options={
    title: 'Order ID',
    takePhotoButtonTitle: 'Take photo with camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}

var picture = [];
export default class orderPage extends Component {

      constructor(props) {
        super(props);
        var views =[];
        this.onPress = this.uploadImageClicked.bind(this);
        this.state = {
            dataSource:[],
             avatarSource:[],
             view : views,
             orderID : null
              }
              fetch(global.IP+'/shipping/',{
                method : 'get'
              })
              .then((response) => { return  response.json() } )
             .catch((error) => console.warn("fetch error:", error))
             .then((response) => {
             this.setState({dataSource : response.list, orderID : response.orderID});
             this.state.dataSource.map((item,key)=>{
                views.push(
                 <View>
                    <Text style={styles.itemStyle}>{item.ordername}</Text>
                     <TouchableOpacity style={styles.buttonStyle}
                         onPress={() => this.onPress(item.ordername)} >
                         <Text style={styles.textStyle}>Take Photo</Text>
                     </TouchableOpacity>
                 </View>
                 );
             });
         this.setState({view : views});
         });
     }
     uploadImageClicked=(crop) => {
     console.log(crop);
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            picture.push({uri : response.uri, fileName : response.fileName, cropName : crop});
            this.setState({
              avatarSource: picture,
            });
          }
        });
     }

    upload=()=>{
    console.log(this.state.avatarSource.length);
    this.state.avatarSource.map((item, key)=>{

         const data = new FormData();
            data.append('crop',item.cropName);
            data.append('Bottle', {
              uri: item.uri,
              type: 'image/jpeg', // or photo.type
              name: item.fileName,
            });
            fetch('http://192.168.0.102:3000/shipping/'+this.state.orderID+'/',{
              method : 'post',
              body : data
            }).then(res => {
              console.log(res)
            });
    });
    }

    render(){

        return(

                <View style={styles.container}>
                    <Text style={styles.textStyle}>Order ID : {this.state.orderID}</Text>
                    <View>
                    {this.state.view}
                    </View>
                    <TouchableOpacity style={styles.buttonStyle}
                    onPress={this.uploadImageClicked}>
                        <Text>Add photos</Text>
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

    container: {
    backgroundColor: '#ffffff',
    flexGrow:1,
    justifyContent:'center',
    alignItems:'center',
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
          itemStyle:{
             fontSize:20,
             fontWeight:'bold',
             marginVertical:10,
             flexDirection:'row',

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


})





