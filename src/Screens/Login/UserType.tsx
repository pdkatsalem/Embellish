import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react'
import { View ,Text,Image,TouchableOpacity } from 'react-native'
import SplashScreen from 'react-native-splash-screen';
import AppDefaults from '../../Defaults/AppDefaults';
import loginStore from '../../Stores/loginStore';
import rootStore from '../../Stores/rootStore';

export interface IProps{
    loginStore :loginStore,
    navigation ?:any
}

@inject (()=>(
    {
        loginStore : rootStore.loginStore
    }
))
@observer
export default class UserType extends React.Component<IProps ,{}>{

@action setValueAndLogin(UserType:any){
    this.props.loginStore.selectDesigner(UserType)
    this.props.navigation.navigate('Login')
}

@action async componentDidMount(){
    await this.props.loginStore.init()
    SplashScreen.hide()
}

    render(){
        return(
            <View style={{ flex:1,flexDirection:"column" }}>
                <View style={{ flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"white" }}>
                    <Text style={{ fontSize:30 , fontWeight:"600",color:AppDefaults.themeColor }}>I am a </Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={{ flex:4,alignItems:"center",justifyContent:"center",backgroundColor:"white" }} onPress={() => this.setValueAndLogin(true)} >
                    <Image source={require('../../assets/designer.jpg') } style={{ height:200,width:200 }} />
                    <Text style={{ margin:10 }} >Brand team</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.setValueAndLogin(false)} style={{ flex:4,backgroundColor:"white",alignItems:"center",justifyContent:"center" }}>
                <Image source={require('../../assets/teams.jpg') } style={{ height:200,width:200 }} />
                <Text style={{ margin:10 }} >Sourcing / Merchandising </Text>
                </TouchableOpacity>
            </View>
        )
    }
}