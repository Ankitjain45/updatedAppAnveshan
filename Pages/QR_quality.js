import React, { Component } from 'react';
import { Button, Text, View ,Image,ImageBackground,TouchableOpacity,Alert} from 'react-native';
import { RNCamera } from 'react-native-camera';
import {Actions} from 'react-native-router-flux';

class ProductScanRNCamera extends Component {

  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      invID : props.invID,
      scannedData:null,
      camera: {
        type: RNCamera.Constants.Type.back,
	flashMode: RNCamera.Constants.FlashMode.auto,
      },
      imageURL:null,
      requestScan_QR_Text:'Please scan the QR code',
      requestScan_BAR_Text:'Please scan the Barcode',
    };
  }

  onBarCodeRead(scanResult) {

    console.warn(scanResult.type);
    console.warn(scanResult.data);
    this.setState({scannedData : scanResult.data});
    if (scanResult.data != null) {
    this.setState({requestScan_QR_Text:scanResult.type+' scanned successfully'});

	if (!this.barcodeCodes.includes(scanResult.data)) {
	  this.barcodeCodes.push(scanResult.data);

	  console.warn('onBarCodeRead call');
	}
    }
    return;
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);

      this.setState({imageURL:data.uri});

      console.log(this.state.imageURL);

    }
  };

  upload =()=>{
    if(this.state.imageURL!=null && this.state.scannedData != null){
      const imageData = new FormData();
      imageData.append('Container Image', {
        uri: this.state.imageURL,
        type: 'image/jpeg',
      });

      fetch(global.IP+'/container', {
        method: 'post',
        body: imageData,
      }).then(response=> {
      if(response.status===200 || response.status===201  )
          Alert.alert("Submitted successfully")
       else
          Alert.alert("Submission Failed")
           } )
      .catch((error) => console.warn("fetch error:", error));
      this.setState({imageURL:null});
      this.setState({scannedData:null});
      this.setState({requestScan_QR_Text: 'Please scan the QR code' })

    }
    else if (this.state.imageURL==null){
        Alert.alert('Please capture an image ');
    }
    else if (this.state.scannedData == null){
         Alert.alert('Please Scan the code ');
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }
    receive_inventory(){
        Actions.receiveInventory({invID : this.state.invID});
    }
  render() {

    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            defaultTouchToFocus
            flashMode={this.state.camera.flashMode}
            mirrorImage={false}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            style={styles.preview}
            type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
	  <Text style={styles.scanScreenMessage}>{this.state.requestScan_QR_Text}</Text>
	  <Text style={styles.scanScreenMessage}>{this.state.requestScan_BAR_Text}</Text>

         <TouchableOpacity style={styles.captureIcon}
             onPress={this.receive_inventory.bind(this)}>
            <Image source={require('../Images/Fill-manually.png')}
             style={styles.captureIcon}/>

             <Text style={styles.fillText}>Manual Entry</Text>

         </TouchableOpacity>

	</View>
	<View style={[styles.overlay, styles.bottomOverlay]}>

            <TouchableOpacity style={styles.icon}
              onPress={this.receive_inventory.bind(this)} >
                <Image source={{uri: this.state.imageURL}}
                 style={styles.icon}/>
             </TouchableOpacity>

             <TouchableOpacity style={styles.captureIcon}
                 onPress={this.takePicture.bind(this)}>
                <Image source={require('../Images/capture.png')}
                 style={styles.captureIcon}/>
             </TouchableOpacity>

             <TouchableOpacity style={styles.uploadIcon}
                 onPress={this.upload.bind(this)}>
                <Image source={require('../Images/upload.png')}
                 style={styles.uploadIcon}/>
             </TouchableOpacity>


	</View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
    icon:{
      width:80,
      height:80,
      marginRight:8,
      marginLeft:-30,
    },
    uploadIcon:{
      width:60,
      height:60,
      marginLeft:20,
      marginRight:-30,
    },
    captureIcon:{
        width:60,
        height:60,

    },

  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight:'bold',

  },
  fillText:{
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight:'bold',
  }
};

export default ProductScanRNCamera;