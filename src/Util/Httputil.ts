

import { Alert } from "react-native";
import AppDefaults from "../Defaults/AppDefaults";
import commonStore from "../Stores/commonStore";
import rootStore from '../Stores/rootStore';
class HttpWrapper {
    baseUrl: string;
    syncTimeout: number;
    isLoader:boolean;
    CommonStore : commonStore

    constructor(baseUrl : any,isLoader=true,timeout=30){
        this.baseUrl = baseUrl;
        this.isLoader = isLoader;
        this.syncTimeout = timeout;
        this.CommonStore =  rootStore.commonStore

    }

    async httpFetch(url : any, config : any){
        url = this.baseUrl + url
        console.log(url + "  ::: xzxz " + this.syncTimeout)
        // console.log(config)
        this.syncTimeout = this.syncTimeout * 1000;
        if(this.isLoader){
                rootStore.commonStore.setLoaderState(true)
            }
        let response: any = null;
        try {
            response = await this.timeout(this.syncTimeout, fetch(url, config));
        } catch (e){
            Alert.alert("Exception",e.message + (e.message.toLowerCase().includes('network request failed')? ".Please Check internet connection " :"") )
        } finally {
            if(this.isLoader){
                rootStore.commonStore.setLoaderState(false);
            }

        }

        return response;
    }

    async get(url: string){
        let config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        console.log(config.headers)
        console.log("get url" ,url)
        return this.httpFetch(url, config);
    }

    async post(url: string, body: object){
        let config = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(body)};
            console.log( "body json oe",body)
            console.log( "body json", config.body)
        return this.httpFetch(url, config);
    }

    // async postImage(url: string, body: any) {
    //     let formdata = new FormData();
    //     formdata.append('image', {uri: body.uri, name: body.fileName, type: body.type})
    //     let config = {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'multipart/form-data', //await AppStorage.getValue(AppStorage.STOREDETAILS.AUTHKEY)
    //             'X-Auth-Token' : '4e248943-d818-4390-9919-4f796b737b7f'
    //         },
    //         body: formdata
    //     };
    //     return this.httpFetch(url, config);
    // }

    timeout(ms : any , promise :any){
        return new Promise(function (resolve, reject){
            setTimeout(function (){
                reject(new Error("timeout"))
            }, ms);
            promise.then(resolve, reject)
        })
    }

    async getResponse(url: string){
        let retResp : any
        const response: any = await this.get(url);
        if (response == null)
        {return null;}

        try{
            // console.log("act getresponse",response)
            if (response.ok){
                retResp =  await response.json();
            }
        }
        catch(e){
            console.log("getresponse",e.message)
            retResp = {}
        }
    return retResp
    }

    async postResponse(url: string, body: object){
        let retResp : any = null
        const response: any = await this.post(url, body);
        if (response == null)
            {return null;}
        try{
            if (response.ok){
                retResp = await response.json();
            } 
        }
        catch(e){
            console.log(e.message)
            response.text().then(function(text : any){
                console.log("Error Response")
                console.log(text)
            })
        }
        return retResp

    }

    // async postResponseWithImage(url: string, body: any) {
    //     const response: any = await this.postImage(url, body);
    //     if (response.ok) {
    //         return await response.json();
    //     } else {
    //         return null;
    //     }
    // }

}

class StoreHttp extends HttpWrapper {

    constructor(url :any ,  isLoader :any,timeout :any ){
            super(`${url}`,isLoader,timeout);
    }

}

const StoreHttpClient = (url =AppDefaults.baseUrl ,timeout=30,isLoader=true)=> new StoreHttp(url,isLoader,timeout);

export {HttpWrapper, StoreHttpClient};
