
import React,{Component} from 'react';
import { View, Text,StyleSheet } from 'react-native';

import Routes from './src/Routes';
import Home from './Pages/Home';


export default class App extends Component<Props> {
    render(){
          return (
                <View style={styles.Container}>
                    <Routes/>
                </View>
          );
     }
}

const styles = StyleSheet.create({

  Container: {
    backgroundColor: '#ffffff',
    flexGrow:1,
    justifyContent:'center',

  }

})