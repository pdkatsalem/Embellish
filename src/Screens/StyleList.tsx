import { Picker } from '@react-native-picker/picker'
import { action, makeObservable, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react'
import {View,Text,Image,TextInput, TouchableOpacity, FlatList } from 'react-native'
import AppDefaults from '../Defaults/AppDefaults';
import loginStore from '../Stores/loginStore';
import rootStore from '../Stores/rootStore';
import styleStore from '../Stores/styleStore';
import CommonUtils from '../Util/CommonUtil';
import { StoreHttpClient } from '../Util/Httputil';
import SplashScreen from 'react-native-splash-screen'
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
export default class StyleList extends React.Component<IProps,{}>{
    @observable selectedValue : any
    @observable brandList : any = []
    @observable styleCode : any = ''
    @observable styleList :any = []
    @observable styleFilterList :any = []
    constructor(props :any){
        super(props)
        makeObservable(this)
    }

    @action async componentDidMount(){
        SplashScreen.hide()
        console.log("component did update")
        await this.getBrands()  
        await this.getStyles()  
    }

    @action async logout(){
        await this.props.loginStore?.logout()
        this.props.navigation?.navigate('UserType')
    }

    @action onStylesChange(style : any){
        this.styleCode = style
        this.styleFilterList =  this.styleList.filter( (styleData :any) =>  styleData.name.toLowerCase().match(style.toLowerCase()) )
    }

    @action async getBrands(){
        let brandResponse =  await StoreHttpClient().getResponse('/brands').then()
        if (brandResponse && brandResponse!=null){
            this.brandList= brandResponse.data
        }        
    }
    @action async getStyles(){
        let styleResponse =  await StoreHttpClient().getResponse('/styles').then()
        console.log("styles" ,styleResponse)
        if (styleResponse && styleResponse!=null){
            this.styleList= styleResponse.data
            this.styleFilterList = Object.assign([],this.styleList)
        }        

    }

    @action async createStyles(){
            await this.postStyles()
            await this.getStyles()
            this.styleCode = ''
    }
    @action async postStyles(){
        let styleResponse =  await StoreHttpClient().postResponse('/styles',{name : this.styleCode}).then()
        console.log("styles" ,styleResponse)
        if (styleResponse && styleResponse!=null){
            if (styleResponse.status == "success"){
                CommonUtils.snackBar("Style create")
                // await this.getStyles()
            }
        }    

    }

    @action moveToMenuList(style :any){
        this.props.styleStore.selectStyle(style)
        this.props.navigation.navigate('MyMenu')
    }
    @action onSelectBrand(item :any,idx :any){
        console.log("item name" ,item + idx)
        this.selectedValue = item
        }

        renderItem = ({item} :any) =>
            
               <TouchableOpacity 
                    activeOpacity={0.6} 
                    style={{ borderBottomColor:"#ccc", 
                                borderBottomWidth : 1,backgroundColor:"white"
                        }}
                    onPress={()=>this.moveToMenuList(item)}
                
                >
                    <Text style={{ fontSize:16,padding:15,color:"black" }}>{item.name}</Text>
                 </TouchableOpacity>
            
        

        keyExtractor = (item:any) => item.id;
    
    render(){
        let searchResult : any

        if (this.styleFilterList.length ==0 && this.styleCode !=''){
            searchResult = <TouchableOpacity style={{ backgroundColor:AppDefaults.gradientStartColor,padding:15,paddingLeft:25,paddingRight:25,alignSelf:"center",borderRadius:25 }} onPress={async () => await this.createStyles()} >
            <Text style={{ color:"white",fontWeight:"800" }}>Create Style</Text>
        </TouchableOpacity>
        }
        else if(this.styleFilterList.length > 0) {
            searchResult = <FlatList style={{ maxHeight : 250 }}
            data={this.styleFilterList}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
    
        />
        }
        else{
            searchResult =  <Text>No styles found</Text>
        }
        return(
            <View style={{ 
            backgroundColor : AppDefaults.backDropColor,
            flex :1 ,
            flexDirection : "column"}}>
                
                <TouchableOpacity
                style={{ position:"absolute",right:10,top:10 }}
                onPress={ ()=>this.logout()}>
                    <Image source={require('../assets/logout.jpg')}   style={{ height:40,width:40 }}/>
                </TouchableOpacity>
                <View style={{ flex:1 ,alignItems:"center",justifyContent:"center",flexDirection:"row"}} >
                    <Image source={require('../assets/Home.png')}  style={{ height:100,width:100 }} />
                </View>
                
                <View style={{  flex:1,justifyContent:"center" }}>
                <Text style={{ margin:5 ,color:"#ccc"}}>Brand</Text>
                    <View style={{ borderWidth : 1,borderColor:"#ccc",borderRadius:5,margin:5 }} >
                    
                    <Picker 
                        selectedValue={this.selectedValue}
                        onValueChange={(value,index) => this.onSelectBrand(value,index)}
                        >
                        {this.brandList.map((brand :any) => <Picker.Item key = {brand.id}  label={brand.name} value={brand.name} ></Picker.Item> )}
                    </Picker>
                    </View>
                </View>
                <View style={{  flex:3,padding:5, }}>
                <Text style={{ margin:5,color:"#ccc" }}>Style</Text>
                <TextInput
                            style={{ marginBottom : 15,borderWidth:1,borderColor:"#ccc",borderRadius:5 }}
                            placeholder="Search a style .."
                            onChangeText={(text:any) => this.onStylesChange(text)}
                            value = {this.styleCode}
                        />
                    {searchResult}



                </View>
                
            </View>
        )
    }
}