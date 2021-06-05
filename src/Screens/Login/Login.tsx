import { action, makeObservable, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { View ,StyleSheet,Text,Image,TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AppDefaults from '../../Defaults/AppDefaults'
import commonStore from '../../Stores/commonStore'
import loginStore from '../../Stores/loginStore'
import rootStore from '../../Stores/rootStore'
import CommonUtils from '../../Util/CommonUtil'
import { StoreHttpClient } from '../../Util/Httputil'
export interface IProps{
    navigation ?:any,
    loginStore : loginStore,
    commonStore ?: commonStore
}

@inject(()=> ({
    loginStore : rootStore.loginStore ,
    commonStore : rootStore.commonStore
}))
@observer
export default class Login extends React.Component<IProps,{}>{
    @observable userName : any
    @observable passWord : any

    constructor(props : any){
        super(props)
        makeObservable(this)
    }

    

    @action onChangeCredentials (type :any , value : any){
        console.log("onchange " ,value ,type)
        if (type =="u"){
            this.userName = value
        }
        else if(type == "p"){
            this.passWord = value
        }
    }
    @action async login(userName : any ,pass : any){
        let loginResponse = await StoreHttpClient().getResponse(`/login?user=${userName}&pass=${pass}&type=${this.props.loginStore.isDesigner ? "designer" : "team"}`)
        if (!loginResponse || loginResponse ==null){
            CommonUtils.snackBar("could not connect to the server")
        }
        else if(loginResponse.status && loginResponse.status == "success" ){
            this.props.loginStore.setUsername(userName)
            this.props.loginStore.setPassword(pass)
            this.props.loginStore.setOtpStatus(true)
            this.props.navigation.navigate('MainMenu')
    }
    else {
        console.log(loginResponse)
        CommonUtils.snackBar("Please enter valid credentials")
    }
    }
    render(){
        return(
            <View style={{ flex :1 }}>
                <View style={{ flex:1,flexDirection : "column" }}>
                    <View style={{flex:1,backgroundColor:"#ebffef",borderBottomLeftRadius:25,borderBottomRightRadius:25}} >

                    </View>
                    <View style={{flex:1}} >

                    </View>
                </View>
                <View style={{ position:"absolute",left:"28%",top:"6%",backgroundColor:"transparent" }}>
                <Image source={require('../../assets/Loginicon.png') } style={{ width:150,height:150 }} />
                </View>
                <View style={styles.loginContainer}>
                    
                    <Text style={{ textAlign:"center",color:"#ccc" }}>{this.props.loginStore.isDesigner ? "Brand team" : "Sourcing / Mechandising" } Login</Text>
                        <TextInput
                            style={styles.loginInput}
                            placeholder="UserName"
                            onChangeText={text => this.onChangeCredentials("u",text)}
                            value = {this.userName}
                        />
                        <TextInput
                            style={styles.loginInput}
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={text => this.onChangeCredentials("p",text)}
                            value = {this.passWord}

                        />
                        <TouchableOpacity onPress={() => this.login(this.userName,this.passWord)}  style={{ alignItems:"center",margin:15 }} >
                        <Image source={require('../../assets/LoginArrow.png') } style={{ width:60,height:40 }} />
                        </TouchableOpacity>
                        {/* <Button title="Login" onPress={() => this.login(this.userName,this.passWord)} /> */}
                </View>
            </View>
        )
    }
}

const styles =  StyleSheet.create({
    loginInput : {
        borderBottomWidth: 2,
        height:40,
        borderBottomColor:AppDefaults.themeColor,
        marginTop : 15,
        marginBottom :15,
        color:"black"
    },
    loginContainer : {
        position:"absolute",
        margin:20,
        borderRadius :10,
        elevation:5,
        width:"90%",
        backgroundColor:"white",
        opacity : 1,
        zIndex:3,
        padding: 15,
        top:"30%"

    }
})