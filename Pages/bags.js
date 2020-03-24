import React, { Component } from "react";
import { StyleSheet, Text, View,TouchableOpacity,Alert,Slider,ScrollView } from "react-native";
import RNPicker from "rn-modal-picker";
import ImagePicker from 'react-native-image-picker';

const options={
    title: 'Update Inventory',
    takePhotoButtonTitle: 'Take photo with camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}
var picture = [];
export default class manageInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter:0,
      avatarSource:null,
      slideValue:0,
      id:props.idValue,


      dataSource: null,
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
      placeHolderTextFarmers: "Please select Farmer",
      placeHolderTextCrops: "Please select Crops",
      selectedFarmerName: "",
      selectedCropName: "",
      selectedFarmerid:"",
      selectedCropid:"",
    };
    fetch(global.IP+'/farmers/list',{
                method: 'get',
              }).then((response) => { return  response.json() } )
                               .catch((error) => console.warn("fetch error:", error))
                               .then((response) => {
                                    this.setState({dataSource : response.list});
                                    });
     console.log(this.state.dataSource);
  }
  _selectedFarmer(index, item) {
    this.setState({ selectedFarmerName: item.name });
    this.setState({ selectedFarmerid: item._id });
  }
  _selectedCrop(index, item) {
    this.setState({ selectedCropName: item.name });
    this.setState({ selectedCropid: item.id});
  }



  uploadImageClicked=() => {
       ImagePicker.showImagePicker(options, (response) => {
         console.log('Response = ', response);

         if (response.didCancel) {
           console.log('User cancelled image picker');
         } else if (response.error) {
           console.log('ImagePicker Error: ', response.error);
         } else {
           picture.push({ uri: response.uri, fileName : response.fileName});

           this.setState({
           counter : this.state.counter+1,
             avatarSource: picture
           });
         }
       });
    }
        upload=()=> {

        console.log(this.state.id);
        if(this.state.avatarSource.length === this.state.slideValue){
            this.state.avatarSource.map((item,key)=>{
                   const data = new FormData();
                            data.append('farmer_id',this.state.selectedFarmerid);
                            data.append('crop',this.state.selectedCropName);
                            data.append('user_id', this.state.id);
                            data.append('bag_moisture', {
                              uri: item.uri,
                              type: 'image/jpeg', // or photo.type
                              name: item.fileName,
                            });
                            fetch(global.IP+'/bags/' + this.state.selectedCropName, {
                              method: 'post',
                              body: data,
                            }).then(response => {
                              if(response.status===200 || response.status===201  )
                                  Alert.alert("Received successfully")
                               else
                                  Alert.alert("Submission Failed")
                            });
            });
        }
      }
  render() {
    return (
        <ScrollView>

            <View style={styles.container}>

                <RNPicker style={styles.picker}
                dataSource={this.state.dataSource}
                dummyDataSource={this.state.dataSource}
                defaultValue={false}
                pickerTitle={"Select Farmer"}
                showSearchBar={true}
                disablePicker={false}
                changeAnimation={"none"}
                searchBarPlaceHolder={"Search....."}
                showPickerTitle={true}
                searchBarContainerStyle={this.props.searchBarContainerStyle}
                pickerStyle={styles.pickerStyle}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectedLabel={this.state.selectedFarmerName}
                placeHolderLabel={this.state.placeHolderTextFarmers}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                dropDownImage={require("../Images/drop-down-arrow.png")}
                selectedValue={(index, item) => this._selectedFarmer(index, item)}
                />

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
                selectedLabel={this.state.selectedCropName}
                placeHolderLabel={this.state.placeHolderTextCrops}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                dropDownImage={require("../Images/drop-down-arrow.png")}
                selectedValue={(index, item) => this._selectedCrop(index, item)}
                />

                <Text style={styles.textStyle} > Number of Bags : {this.state.slideValue}</Text>

                <Slider style={{width:"60%"}} step={1} maximumValue={100} value={this.state.slideValue} onValueChange={(slideValue) => this.setState({slideValue})} />

                <TouchableOpacity style={styles.uploadBagButton}
                onPress={this.uploadImageClicked}>
                <Text style={styles.buttonTextStyle}>Upload image of Bag</Text>
                </TouchableOpacity>
                <Text style={styles.textStyle}>Images taken : {this.state.counter} </Text>

                <TouchableOpacity style={styles.uploadButton }
                onPress={this.upload.bind(this)}>
                <Text style={styles.buttonTextStyle}>Upload</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    //justifyContent: "center"
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
    marginTop:40,
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

    marginTop:60,
    color:'#000000',
    fontSize:20,
    fontWeight:'bold',
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
           marginVertical:10,
           marginBottom:15,
           borderRadius:20,
           alignItems:'center',


        },
     uploadBagButton:{
         marginVertical:30,
         marginBottom:20,
         backgroundColor: '#439889',
         width:200,
         height:35,
         borderRadius:25,
         alignItems:'center',

       },

});