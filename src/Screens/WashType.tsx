
import { action, makeObservable, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react'
import AppHeader from '../components/Header'
import {View,Text,Image,TextInput, TouchableOpacity, FlatList } from 'react-native'

import loginStore from '../Stores/loginStore';
import rootStore from '../Stores/rootStore';
import styleStore from '../Stores/styleStore';
import { StoreHttpClient } from '../Util/Httputil';

interface IProps{
    loginStore :loginStore,
    styleStore : styleStore,
    navigation ?:any
}

@inject(()=>({
    loginStore : rootStore.loginStore,
    styleStore : rootStore.styleStore
}))
@observer
export default class WashType extends React.Component<IProps,{}>{
    @observable washType : any =''
    @observable washList : any = []
    @observable washListFilterRes : any = []
    constructor(props :any){
        super(props)
        makeObservable(this)
    }

    @action async componentDidMount(){
        console.log("component did update")
        await this.getWashType()  
    }

    @action onWashTypeChange(wash :any){
        this.washType = wash
        console.log("washlist",this.washList)
        this.washListFilterRes = this.washList.filter((washData :any) => washData.name.toLowerCase().match(wash.toLowerCase()) )
    }

    @action async getWashType(){
        let washTypeResponse =  await StoreHttpClient().getResponse('/washList').then()
        if (washTypeResponse && washTypeResponse!=null){
            this.washList = washTypeResponse.data
            this.washListFilterRes = Object.assign([],this.washList)
        }

    }

    @action async moveToBoard(washType :any){
        this.props.styleStore.selectWashType(washType)
        await this.props.styleStore.moveToBoardWashList(this.props.navigation,true)

    }

    renderItem = ({item} :any) =>
            
    <TouchableOpacity 
         activeOpacity={0.6} 
         style={{ borderBottomColor:"#ccc", 
                     borderBottomWidth : 1,backgroundColor:"white"
             }}
         onPress={()=>this.moveToBoard(item)}
     
     >
         <Text style={{ fontSize:16,padding:15,color:"black" }}>{item.name}</Text>
      </TouchableOpacity>
 


keyExtractor = (item:any) => item.id;

    render(){
        let searchResult
        if (this.washListFilterRes.length ==0 && this.washType !=''){
            searchResult =  <Text>Try with other search term .No Washtype found</Text>
        }
        else if(this.washListFilterRes.length > 0) {
            searchResult = <FlatList 
            data={this.washListFilterRes}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
    
        />
        }
        else{
            searchResult =  <Text>No Washtype found</Text>
        }


        return(
            <View style={{ flex:1,backgroundColor:"#fffafa" }}>
                <AppHeader title={this.props.styleStore.selectedStyleCode} />
                <View>
                <Image source={require('../assets/Library.png')} style={{ width:100,height:100,alignSelf:"center" }} />
                <TextInput
                            style={{
                                marginLeft:5,
                                marginRight:5,
                                borderBottomWidth:1,
                                borderColor:"#ccc",borderRadius:5 }}
                            placeholder="Search a Wash type .."
                            onChangeText={(text:any) => this.onWashTypeChange(text)}
                            value = {this.washType}
                        />
                    {searchResult}



                </View>
            </View>
        )
    }
}