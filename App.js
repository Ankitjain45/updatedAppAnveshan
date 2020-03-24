import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';

import Routes from './src/Routes';
import Home from './Pages/Home';


export default class App extends Component < Props > {


    render() {
        return (

            <
            View style = { styles.Container } >
            <
            StatusBar backgroundColor = '#439889'
            barStyle = 'light-content' / >
            <
            Routes / >
            <
            /View>
        );
    }
}

const styles = StyleSheet.create({

    Container: {
        backgroundColor: '#ffffff',
        flexGrow: 1,
        justifyContent: 'center',

    }

})