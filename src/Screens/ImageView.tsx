
import { action, makeObservable, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react'
import {View,Text,Image, TouchableOpacity,Dimensions } from 'react-native'
import AppHeader from '../components/Header';
import AppDefaults from '../Defaults/AppDefaults';

import loginStore from '../Stores/loginStore';
import rootStore from '../Stores/rootStore';
import styleStore from '../Stores/styleStore';
import CommonUtils from '../Util/CommonUtil';
import { StoreHttpClient } from '../Util/Httputil';
import ImageZoom from 'react-native-image-pan-zoom';

interface IProps{
    loginStore :loginStore,
    styleStore : styleStore,
    navigation ?:any
}


const FabDetail = ( props :any ) =>{
    return(
        <View style={{ flexDirection:"row",padding:10,borderBottomColor:"#ccc",borderBottomWidth:1 }}>
            <View style={{ flex:1 }}>
                <Text style={{color:"#752c02",fontWeight:"bold" }}>{props.title} :</Text>
            </View>
            <View style={{ flex:1 }}>
                <Text>{props.value}</Text>
            </View>
        </View>
    )
}

@inject(()=>({
    loginStore : rootStore.loginStore,
    styleStore : rootStore.styleStore
}))
@observer
export default class ImageView extends React.Component<IProps,{}>{
    @observable selectFabric : any
    @observable isWishListed : any = false
    @observable isLoading :any =true
    focusListener :any
    constructor(props :any){
        super(props)
        makeObservable(this)
    }

    @action async componentDidMount(){
        console.log("call wish list in component did moount ")
        this.focusListener = this.props.navigation.addListener('focus', async () => {
            await this.getWishListDetails()  
          })
        // await this.getWishListDetails()  
    }

    init(){
        this.isWishListed =false
        this.isLoading =true
    }

    componentWillUnmount(){
        this.focusListener()
    }

    @action async getWishListDetails(){
        this.isLoading = true
        let wishResponse = await StoreHttpClient().getResponse(`/isWishlist?style=${this.props.styleStore.selectedStyle.id}&fabric=${this.props.styleStore.selectedFabric.id}`)
        if (wishResponse && wishResponse !=null){
            console.log("wishList",wishResponse)
            this.isWishListed = wishResponse.isExist
            this.isLoading = false
        }
        else{
            CommonUtils.snackBar("Could not get wish list status")
        }

    }

    @action async markWishList(isRemove : boolean = false){
        let removeParam  :any = ''

        if (isRemove){
            removeParam = '?isRemove=1'
        }
        this.isLoading = true
        
        let wishResponse = await StoreHttpClient().postResponse(`/wishlist${removeParam}`,{ styleId  :this.props.styleStore.selectedStyle.id,fabricID :this.props.styleStore.selectedFabric.id  })
        if (wishResponse && wishResponse !=null){
            console.log("wishList",wishResponse)
            CommonUtils.snackBar(wishResponse.status)
            await this.getWishListDetails()
            this.isLoading = false
        }
        else{
            CommonUtils.snackBar("Could not get wish list status")
        }
    }




    render(){
        let wishlist :any

        if (!this.isLoading && this.props.loginStore.isDesigner){
            if(!this.isWishListed){
                wishlist = <TouchableOpacity style={{ borderWidth:1,borderColor:AppDefaults.gradientStartColor,padding:15,paddingLeft:25,paddingRight:25,alignSelf:"center",borderRadius:25,margin:5 }} onPress={() => this.markWishList(false)} >
                <Text >Add to Style</Text>
            </TouchableOpacity>
            }
            else{
                wishlist =<TouchableOpacity style={{ borderWidth:1,borderColor:AppDefaults.gradientStartColor,padding:15,paddingLeft:25,paddingRight:25,alignSelf:"center",borderRadius:25 }} onPress={() => this.markWishList(true)} >
                <Text >Remove from Style</Text>
            </TouchableOpacity>
            }
        }
        return(
            <View style={{ flex:1,backgroundColor:"#fffafa" }}>
                <AppHeader title={this.props.styleStore.selectedStyleCode} />
                

                <View style={{ alignItems:"center",margin:15,borderRadius:10 }}>
                    {/* <Image source={{  uri : AppDefaults.baseUrl + this.props.styleStore.selectedImagePath}} style={{ width:210 ,height:210,borderRadius:10  }} /> */}
                    <ImageZoom 
                        cropWidth={230}
                        cropHeight={230}
                        imageWidth={230}
                        imageHeight={230}
                        style={{ borderRadius:15 }}>
                        <Image style={{width:230, height:230,borderRadius:10}}
                       source={{uri:AppDefaults.baseUrl + this.props.styleStore.selectedImagePath}}/>
                    </ImageZoom>
                </View>
                <View style={{ backgroundColor:"white",elevation:5,margin:15,padding:15,borderRadius:5 }}>
                    <FabDetail   title="Color " value ={this.props.styleStore.selectedFabric.color} />
                    <FabDetail   title="Ticket " value ={this.props.styleStore.selectedFabric.ticket} />
                    <FabDetail   title="Composition " value ={this.props.styleStore.selectedFabric.composition} />
                    <FabDetail   title="RPM " value ={this.props.styleStore.selectedFabric.rpm} />
                    <FabDetail   title="Thread color " value ={this.props.styleStore.selectedFabric.threadColor} />
                </View>
                {wishlist}
            </View>
        )
    }
}