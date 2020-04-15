import React, { Component } from 'react';
import { Button, Text, View ,Image,ImageBackground} from 'react-native';
import { RNCamera } from 'react-native-camera';

class ProductScanRNCamera extends Component {

  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {

      camera: {
        type: RNCamera.Constants.Type.back,
	flashMode: RNCamera.Constants.FlashMode.auto,
      },
      imageURL:'',
      requestScanText:'Please scan the QR code',
    };
  }

  onBarCodeRead(scanResult) {
    console.warn(scanResult.type);
    console.warn(scanResult.data);

    if (scanResult.data != null) {
    this.setState({requestScanText:scanResult.type+' scanned successfully'});
    console.log("aaaaaa");
    {this.takePicture()}
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
	  <Text style={styles.scanScreenMessage}>{this.state.requestScanText}</Text>
	</View>
	<View style={[styles.overlay, styles.bottomOverlay]}>
          <Button
            onPress={this.takePicture.bind(this)}
            style={styles.enterBarcodeManualButton}
            title="Capture"
           />
                     <Button
                       onPress={this.takePicture.bind(this)}
                       style={styles.enterBarcodeManualButton}
                       title="Fill Manually"
                      />
                            <Image source={{uri: this.state.imageURL}}

                             style={styles.icon}/>

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
      width:30,
      height:30,
      marginLeft:20,
  //    marginTop:60,
  //    marginBottom:10,


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
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default ProductScanRNCamera;