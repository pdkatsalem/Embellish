
import { action, makeObservable, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react'
import {View,Text,Image,TextInput, TouchableOpacity, FlatList } from 'react-native'
import AppHeader from '../components/Header'
import AppDefaults from '../Defaults/AppDefaults';

import loginStore from '../Stores/loginStore';
import rootStore from '../Stores/rootStore';
import styleStore from '../Stores/styleStore';

interface IProps{
    loginStore :loginStore,
    styleStore : styleStore,
    navigation ?:any,
    route ?: any
}

@inject(()=>({
    loginStore : rootStore.loginStore,
    styleStore : rootStore.styleStore
}))
@observer
export default class MyBoard extends React.Component<IProps,{}>{
    @observable selectFabric : any
    focusListener :any
    constructor(props :any){
        super(props)
        makeObservable(this)
    }

    @action async componentDidMount(){
        this.focusListener = this.props.navigation.addListener('focus',async () =>{
            await this.getImages()  
        })
    }

    componentWillUnmount(){
        this.focusListener()
    }

    @action async getImages(){

        if(this.props.route.params.fromPath){
            if(this.props.route.params.fromPath == 'Wash'){
                // await this.props.styleStore.moveToBoardWashList(this.props.navigation)
            }
            else if(this.props.route.params.fromPath == 'MyMenu'){
                await this.props.styleStore.moveToBoardFromMyMenu(this.props.navigation)
            }
        }

    }

    @action moveToItemView(path : any){
        this.props.styleStore.selectFabric(path)
        this.props.navigation.navigate('ImageView')
    }

    renderItem = ({item} :any) =>
    <TouchableOpacity style={{ margin :15,borderRadius:10 }} onPress={ () => this.moveToItemView(item) }>
    <Image source={{ uri : AppDefaults.baseUrl + item.path}} style={{ width:150,height:150,borderRadius:10 }} />
    </TouchableOpacity>

    emptyList= ({item} :any) =>
    <View
        style={{ margin :15,alignItems:"center" }} 
        >
    <Image source={require('../assets/noData.jpg')} style={{ margin:10 }} />
    </View>

    keyExtractor = (item :any) => item.id
    render(){
        
        return(
            <View style={{ flex:1,backgroundColor:"#fffafa" }}>
                <AppHeader title={this.props.styleStore.selectedStyleCode} />
                {this.props.styleStore.fabricList.length >0 &&   <Image source={require('../assets/MyBoard.png')} style={{ width:100,height:100,alignSelf:"center" }} />}
                <View style={{ margin:5 ,flexDirection:"row" }}>
                <FlatList 
            data={this.props.styleStore.fabricList}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            numColumns={2}
            ListEmptyComponent={this.emptyList}
    
        />
                
                </View>
            </View>
        )
    }
}