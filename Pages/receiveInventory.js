import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  Slider,

} from 'react-native';
import RNPicker from "rn-modal-picker";

import ImagePicker from 'react-native-image-picker';

const options={
    title: 'Take Photo',
    takePhotoButtonTitle: 'Take photo with camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}



export default class receiveInventory extends Component<Props> {
    constructor(props) {
        super(props);

        console.log(props.invID);
        this.state = {

          avatarSource:null,
          picFileName : null,
          invID : props.invID,
          containerID:'',
          quantity:0,

          dataSource: [],
          cropSource: [
            {
              id: 1,
              name: "Maize"
            },
            {
              id: 2,
              name: "Mustard"
            },
            {
              id: 3,
              name: "Wheat"
            },
            {
              id: 4,
              name: "Rice",

            },
          ],
          placeHolderTextMicroEntrepreneur: "Please select Micro Entrepreneur",
          placeHolderTextCrops: "Please select Crops",
          selectedMicroEntre_Name: "",
          selectedCrop_Name: "",
          selectedMicroEntre_ID:"",
          selectedCrop_ID:"",
        };
        fetch('http://192.168.0.102:3000/micro/list',{
            method : 'get'
            }).then((response) => { return  response.json() } )
               .catch((error) => console.warn("fetch error:", error))
               .then((response) => {
                    this.setState({dataSource : response.list});
                    });
      }
      _selectedMicroEntre(index, item) {
        this.setState({ selectedMicroEntre_Name: item.name });
        this.setState({ selectedMicroEntre_ID: item.id });
      }
      _selectedCrop(index, item) {
        this.setState({ selectedCrop_Name: item.name });
        this.setState({ selectedCrop_ID: item.id});
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
           const fileName = {fileName: response.fileName};
           this.setState({
             avatarSource: source,
             picFileName : fileName
           });

         }
       });
    }
    update=()=> {

            const data = new FormData();
            data.append('crop', this.state.selectedCrop_Name); // you can append anyone.
            data.append('Inv_Bag', {
              uri: this.state.avatarSource.uri,
              type: 'image/jpeg', // or photo.type
              name: this.state.picFileName.fileName,
            });
            data.append('parent',this.state.selectedMicroEntre_ID);
            data.append('number', this.state.containerID);
            data.append('quantity',  this.state.quantity);


            fetch(global.IP+'/inventory/'+this.state.invID+'/', {
              method: 'post',
              body: data,
            }).then(res => {
              console.log(res)
            });


        }

    render(){
        return(

            <View style={styles.Container}>

                <Text style={styles.textStyle}>Select the Micro Entrepreneur</Text>

                <RNPicker
                dataSource={this.state.dataSource}
                dummyDataSource={this.state.dataSource}
                defaultValue={false}
                pickerTitle={"Select Micro Entrepreneur"}
                showSearchBar={true}
                disablePicker={false}
                changeAnimation={"none"}
                searchBarPlaceHolder={"Search....."}
                showPickerTitle={true}
                searchBarContainerStyle={this.props.searchBarContainerStyle}
                pickerStyle={styles.pickerStyle}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectedLabel={this.state.selectedMicroEntre_Name}
                placeHolderLabel={this.state.placeHolderTextMicroEntrepreneur}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                dropDownImage={require("../Images/drop-down-arrow.png")}
                selectedValue={(index, item) => this._selectedMicroEntre(index, item)}
                />

                <Text style={styles.textStyle}>Choose the Crop</Text>

                <RNPicker
                dataSource={this.state.cropSource}
                dummyDataSource={this.state.cropSource}
                defaultValue={false}
                pickerTitle={"Select Crops"}
                showSearchBar={true}
                disablePicker={false}
                changeAnimation={"none"}
                searchBarPlaceHolder={"Search....."}
                showPickerTitle={true}
                searchBarContainerStyle={this.props.searchBarContainerStyle}
                pickerStyle={styles.pickerStyle}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectedLabel={this.state.selectedCrop_Name}
                placeHolderLabel={this.state.placeHolderTextCrops}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                dropDownImage={require("../Images/drop-down-arrow.png")}
                selectedValue={(index, item) => this._selectedCrop(index, item)}
                />

                <Text style={styles.textStyle}>Enter the Container ID</Text>
                <TextInput style={styles.inputBox}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder='Container ID'
                placeholderTextColor='rgba(0,0,0,0.5)'
                onChangeText={(containerID) => { this.setState({ containerID: containerID})}}
                keyboardType='numeric'
                />
                <Text style={styles.textStyle} > Volume received in Liters: {this.state.quantity}</Text>

                <Slider style={{width:"60%"}} step={1} maximumValue={100} value={this.state.quantity} onValueChange={(quantity) => this.setState({quantity})} />

                <TouchableOpacity style={styles.uploadButton}
                onPress={this.uploadImageClicked}>
                <Text style={styles.buttonTextStyle}>Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.updateButton }
                onPress={this.update.bind(this)}>
                <Text style={styles.buttonTextStyle}>Update</Text>
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

    itemSeparatorStyle:{
      height: 1,
      width: "90%",
      alignSelf: "center",
      backgroundColor: "#D3D3D3"
    },
    searchBarContainerStyle: {
      marginBottom: 10,
      flexDirection: "row",
      height: 40,
      shadowOpacity: 1.0,
      shadowRadius: 5,
      shadowOffset: {
        width: 1,
        height: 1
      },
      backgroundColor: "rgba(255,255,255,1)",
      shadowColor: "#d3d3d3",
      borderRadius: 10,
      elevation: 3,
      marginLeft: 10,
      marginRight: 10
    },

    selectLabelTextStyle: {
      color: "#000",
      textAlign: "left",
      width: 280,
      padding: 10,
      flexDirection: "row"
    },
    placeHolderTextStyle: {
      color: "#000000",
      padding: 10,
      textAlign: "left",
      width: 280,
      flexDirection: "row"
    },
    dropDownImageStyle: {
      marginLeft: 10,
      width: 10,
      height: 10,
      alignSelf: "center",

    },
    listTextViewStyle: {
      color: "#000",
      marginVertical: 10,
      flex: 0.9,
      marginLeft: 20,
      marginHorizontal: 10,
      textAlign: "left"
    },
    pickerStyle: {
      marginLeft: 18,
      elevation:3,
      paddingRight: 25,
      marginRight: 10,
      marginBottom: 2,
      shadowOpacity: 1.0,
      shadowOffset: {
        width: 1,
        height: 1
      },
      borderWidth:1,
      shadowRadius: 10,
      backgroundColor: "rgba(255,255,255,1)",
      shadowColor: "#d3d3d3",
      borderRadius: 5,
      flexDirection: "row"
    },
    textStyle:{
      marginVertical:60,
      marginBottom:10,
      color:'#000000',
      fontSize:20,
      fontWeight:'bold',
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


          },
       uploadBagButton:{
           marginVertical:50,
           marginBottom:30,
           backgroundColor: '#439889',
           width:200,
           height:35,
           borderRadius:25,
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
