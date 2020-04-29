import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import FarmerRegister from '../Pages/FarmerRegister';
import receiveInventory from '../Pages/receiveInventory';
import manageInventory from '../Pages/manageInventoryScreen';
import qualityCheck from '../Pages/qualityCheck';
import manualEntryFarmer from '../Pages/manualEntryFarmer';
import QR_Code from '../Pages/QR_Code';
import updateInventory from '../Pages/updateInventory';
import qualityCheckMultiple from '../Pages/qualityCheckMultiple';
import Login from '../Pages/Login.js';
import Signup from '../Pages/Signup';
import inventoryID from '../Pages/inventoryID';
import shipping from '../Pages/shipping';
import bags from '../Pages/bags';
import microEntrepreneur from '../Pages/microEntrepreneur';
import TeamAnveshan from '../Pages/TeamAnveshan';
import Home from '../Pages/Home';
import QR_scanner from '../Pages/QR_scanner';
import orderPage from '../Pages/orderPage';
import rough from '../Pages/rough';
import QR_receive from '../Pages/QR_receive';
import QR_quality from '../Pages/QR_quality';

export default class Routes extends Component<{}> {
    render(){
        return(
            <Router>
                <Stack key="root">
                  <Scene key="Home" component={Home} title="Home"  />
                  <Scene key="receiveInventory" component={receiveInventory} title="Receive Inventory" />
                  <Scene key="FarmerRegister" component={FarmerRegister} title="Register Farmer" />
                  <Scene key="qualityCheck" component={qualityCheck} title="Quality Check" />
                  <Scene key="manageInventory" component={manageInventory} title="Manage Inventory" />
                  <Scene key="manualEntryFarmer" component={manualEntryFarmer} title="Manual Registracd tion" />
                  <Scene key="QR_Code" component={QR_Code} title="QR Codes" />
                  <Scene key="updateInventory" component={updateInventory} title="Update Inventory" />
                  <Scene key="qualityCheckMultiple" component={qualityCheckMultiple} title="Quality Check" />
                  <Scene key="Login" component={Login} title="Login" hideNavBar={true} initial={true} />
                  <Scene key="Signup" component={Signup} title="Signup" hideNavBar={true} />
                  <Scene key="bags" component={bags} title="Receive Bags" />
                  <Scene key="shipping" component={shipping} title="Shipping" />
                  <Scene key="inventoryID" component={inventoryID} title="Inventory ID"  />
                  <Scene key="microEntrepreneur" component={microEntrepreneur} title="Micro Entrepreneur" />
                  <Scene key="TeamAnveshan" component={TeamAnveshan} title="Team Anveshan"   />
                  <Scene key="QR_scanner" component={QR_scanner} title="QR Scanner" />
                  <Scene key="orderPage" component={orderPage} title="Order Page" />
                  <Scene key="rough" component={rough} title="Rough" />
                  <Scene key="QR_receive" component={QR_receive} title="Receive Inventory" />
                  <Scene key="QR_quality" component={QR_quality} title="Quality Check" />
                </Stack>
             </Router>

        )
    }
}

