import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {Actions} from 'react-native-router-flux';

export default class QR_scanner extends Component {
    constructor(props) {
            super(props);
            this.state={
                idValue : props.invID,
                callValue : props.call
            }
         }
  onSuccess = (e) => {
  if(this.state.callValue === 'invID')
  Actions.TeamAnveshan({invID : e.data})
  if(this.state.callValue === 'quality_check')
  Actions.qualityCheck({invID : this.state.idValue, bottle : e.data});
    }

  render() {
    return (
      <QRCodeScanner
        reactivate={true}
        reactivateTimeout={5000}
        onRead={this.onSuccess.bind(this)}
        showMarker={true}
        containerStyle={styles.qrContainer}
        bottomViewStyle={styles.bottomContainer }
        topContent={
                      <TouchableOpacity style={styles.updateButton }
                          >
                          <Text style={styles.buttonTextStyle}>Capture</Text>
                      </TouchableOpacity>}
        bottomContent={
                      <TouchableOpacity style={styles.updateButton }
                          >
                          <Text style={styles.buttonTextStyle}>Fill Manually</Text>
                      </TouchableOpacity>
                }

      />



    );
  }
}

const styles = StyleSheet.create({
    container: {
        flexGrow:1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    bottomContainer:{
        flexDirection:'row',
        width:200,
        height:50,

    },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#ffffff',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  qrContainer:{
    marginTop:50,
    marginBottom:60,
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

