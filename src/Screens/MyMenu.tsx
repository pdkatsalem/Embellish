
import { action, makeObservable, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react'
import {View,Image,TouchableOpacity,Text } from 'react-native'
import AppDefaults from '../Defaults/AppDefaults';
import loginStore from '../Stores/loginStore';
import rootStore from '../Stores/rootStore';
import styleStore from '../Stores/styleStore';

interface IProps{
    navigation : any,
    styleStore : styleStore,
    loginStore : loginStore
}

@inject(() =>(
    {
        styleStore : rootStore.styleStore,
        loginStore : rootStore.loginStore
    }
))
@observer
export default class MyMenu extends React.Component<IProps,{}>{
    @observable styleList : any
    constructor(props :any){
        super(props)
        makeObservable(this)
    }

    @action moveToLibrary(){
        this.props.navigation.navigate('WashType')
    }

    @action async moveToBoard(){
        
        await this.props.styleStore.moveToBoardFromMyMenu(this.props.navigation,true)
        
    }
    
    render(){
        return(
            <View style={{ 
            backgroundColor : AppDefaults.backDropColor,
            flex :1 ,
            flexDirection : "column"}}>
                {/* <View style={{ flex:1,alignItems:"center",justifyContent:"center"}}>
                    <Image source={require('../assets/sewingMachine.png')} style={{ height:100,width:100 }} />
                </View> */}
                { this.props.loginStore.isDesigner && <View style={{ flex:2,justifyContent:"center",alignItems:"center"}}>
                <Image source={require('../assets/Library.png')} style={{ width:100,height:100 }} />
                <TouchableOpacity style={{ borderWidth:1, borderColor:AppDefaults.gradientStartColor,padding:15,paddingLeft:25,paddingRight:25,alignSelf:"center",borderRadius:25 }} onPress={ () => this.moveToLibrary()} >
                    
                    <Text >Library</Text>
                </TouchableOpacity>
                </View>}
                <View style={{ flex:2,alignItems:"center",justifyContent:"center"}}>
                <Image source={require('../assets/MyBoard.png')} style={{ width:100,height:100 }} />
                <TouchableOpacity style={{ borderWidth:1,borderColor:AppDefaults.gradientStartColor,padding:15,paddingLeft:25,paddingRight:25,alignSelf:"center",borderRadius:25 }} onPress={() => this.moveToBoard()} >
                    <Text >My Board</Text>
                </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}