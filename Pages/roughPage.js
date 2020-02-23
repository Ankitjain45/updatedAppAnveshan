//Code of App.js using Navigator
import React,{Component} from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FarmerRegister from './Pages/FarmerRegister';
import ReceiveInventory from './Pages/receiveInventory';
import QualityCheck from './Pages/qualityCheck';
import ManageInventory from './Pages/manageInventoryScreen';


function HomeScreen({ navigation }) {
  return (
    <View style={styles.Container}>
      <TouchableOpacity style={styles.buttonStyle}
        onPress={() => navigation.navigate('Farmer Registration')} >
        <Text style={styles.textStyle}>Register Farmer </Text>
       </TouchableOpacity>

      <TouchableOpacity style={styles.buttonStyle}
        onPress={() => navigation.navigate('Receive Inventory')} >
        <Text style={styles.textStyle}>Receive Inventory</Text>
       </TouchableOpacity>

      <TouchableOpacity style={styles.buttonStyle}
        onPress={() => navigation.navigate('Quality Check')} >
        <Text style={styles.textStyle}>Quality Check</Text>
       </TouchableOpacity>

      <TouchableOpacity style={styles.buttonStyle}
        onPress={() => navigation.navigate('Manage Inventory')} >
        <Text style={styles.textStyle}>Manage Inventory</Text>
       </TouchableOpacity>


    </View>
  );
}

function farmerRegistration({navigation}) {

  return (
    <View style={styles.Container}>
      <FarmerRegister/>

    </View>
  );
}

function receiveInventory({navigation}) {

  return (
    <View style={styles.Container}>
      <ReceiveInventory/>

    </View>
  );
}

function qualityCheck({navigation}) {

  return (
    <View style={styles.Container}>
      <QualityCheck/>
    </View>
  );
}

function manageInventory({navigation}) {

  return (
    <View style={styles.Container}>
        <ManageInventory/>
    </View>
  );
}

const Stack = createStackNavigator();

export default class App extends Component<Props> {
    render(){
          return (
                <NavigationContainer>
                  <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Farmer Registration" component={farmerRegistration} />
                    <Stack.Screen name="Receive Inventory" component={receiveInventory} />
                     <Stack.Screen name="Quality Check" component={qualityCheck} />
                    <Stack.Screen name="Manage Inventory" component={manageInventory} />
                  </Stack.Navigator>
                </NavigationContainer>
          );
     }
}

const styles = StyleSheet.create({

  Container: {
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
  textStyle:{
     color:'#ffffff',
     fontSize:20,
     marginVertical:5,
     fontWeight:'bold',
  }
})