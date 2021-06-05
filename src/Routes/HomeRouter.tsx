import * as React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import AppPage from '../Screens/AppPage';
import SideBar from '../components/SideBar';
import StyleList from '../Screens/StyleList';
import MyMenu from '../Screens/MyMenu';
import WashType from '../Screens/WashType';
import MyBoard from '../Screens/MyBoard';
import ImageView from '../Screens/ImageView';
const Drawer = createDrawerNavigator()
export default class HomeRouter extends React.Component<{},{}>{
    render(){
        return(
                <Drawer.Navigator 
                    initialRouteName="StyleList" 
                    screenOptions={{ gestureEnabled : false }}
                    drawerContent={(props) =><SideBar {...props}/>} >
                        <Drawer.Screen name="StyleList" component={StyleList}></Drawer.Screen>
                        <Drawer.Screen name="DashBoard" component={AppPage}></Drawer.Screen>
                        <Drawer.Screen name="MyMenu" component={MyMenu}></Drawer.Screen>
                        <Drawer.Screen name="WashType" component={WashType}></Drawer.Screen>
                        <Drawer.Screen name="MyBoard" component={MyBoard}></Drawer.Screen>
                        <Drawer.Screen name="ImageView" component={ImageView}></Drawer.Screen>
                </Drawer.Navigator>
        )
    }
}