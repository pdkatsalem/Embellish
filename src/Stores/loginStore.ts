import { action, makeObservable, observable } from "mobx";

import AppStorage from "../Storage/AppStorage";

export default class loginStore {
    @observable userName : any = ''
    @observable password : any = ''
    @observable isLoggedin : any = ''
    @observable mobileNumber : any = ''
    @observable isDesigner : any = true
    @observable isTeam : any = false
    constructor(){
        this.init()
        makeObservable(this)
    }
    @action async logout (){
        await AppStorage.clearStorage()
        await this.init()
    }
    @action async init(){
        this.userName = await AppStorage.getUserName()
        this.password = await AppStorage.getPassword()
        this.isLoggedin = await AppStorage.getOtpStatus() || false
        this.isDesigner = await AppStorage.getUserType()
        this.selectDesigner(this.isDesigner)
    }
    @action setMobileNumber(number : any){
        this.mobileNumber = number
        AppStorage.setMobileNumber(number)
    }

    @action selectDesigner(user : any){
        this.isDesigner = user;
        this.isTeam  = !this.isDesigner
        AppStorage.setUserType(user)
    }

    @action setUsername(user : any){
        this.userName = user
        AppStorage.setMobileNumber(user)
    }

    @action setPassword(pass : any){
        this.password = pass
        AppStorage.setMobileNumber(pass)
    }
    @action setOtpStatus(otp : any){
        this.isLoggedin = otp
        AppStorage.setOtpStatus(otp)
    }

    @action async getOtpStatus (){
       return await AppStorage.getOtpStatus()
    }


}