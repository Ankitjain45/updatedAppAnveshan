import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import FarmerRegister from '../Pages/FarmerRegister';
import receiveInventory from '../Pages/receiveInventory';
import manageInventory from '../Pages/manageInventoryScreen';
import qualityCheck from '../Pages/qualityCheck';
import Home from '../Pages/Home';


export default class Routes extends Component<{}> {
    render(){
        return(
            <Router>
                <Stack key="root">
                  <Scene key="Home" component={Home} title="Home" initial={true} />
                  <Scene key="receiveInventory" component={receiveInventory} title="Receive Inventory" />
                  <Scene key="FarmerRegister" component={FarmerRegister} title="Register Farmer" />
                  <Scene key="qualityCheck" component={qualityCheck} title="Quality Check" />
                  <Scene key="manageInventory" component={manageInventory} title="Manage Inventory" />
                </Stack>
             </Router>

        )
    }
}