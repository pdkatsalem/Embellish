import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeRouter from './HomeRouter';
import Login from '../Screens/Login/Login';
import { inject, observer } from 'mobx-react';
import UserType from '../Screens/Login/UserType';
import rootStore from '../Stores/rootStore';
import loginStore from '../Stores/loginStore';
import { action, makeObservable } from 'mobx';
export interface IProps{
    loginStore : loginStore
}
const Stack = createStackNavigator()
@inject(() => ({
    loginStore : rootStore.loginStore
}))
@observer
export default class AppNavigation extends React.Component<IProps,{}>{

    constructor(props :any){
        super(props)
        makeObservable(this)
    }

    @action async init(){
        this.props.loginStore.init()
    }
    async componentDidMount(){
        await this.props.loginStore.init()
        console.log("this.", this.props.loginStore.isLoggedin)
    }
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                                                    headerShown: false
                                                }}>
                                                    {}
                    {!this.props.loginStore.isLoggedin && <>
                    <Stack.Screen name="UserType" component={UserType}></Stack.Screen>
                    <Stack.Screen name="Login" component={Login}></Stack.Screen> 
                    </>}
                    {this.props.loginStore && <Stack.Screen name="MainMenu" component={HomeRouter}></Stack.Screen>}
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}