import LocalStorage from "./LocalStorage";

export default class AppStorage extends LocalStorage{
    static KEYS = {
        mobileNumber : 'MOBILE_NUMBER',
        password : 'PASSWORD',
        userName : 'USERNAME',
        isOtpVerified : 'IS_OTP_VERIFIED',
        userType : 'IS_DESIGNER'
    }
    static setValue(key: string, value: any){
        super.set(key, value);
    }

    static getValue(key: string, defaultValue: string = ''){
        if (super.get(key)!== null){
            return super.get(key);
        } else
            return defaultValue;
    }

   static  setUserName (reponse :  any){
        this.setValue(this.KEYS.userName,reponse)
    }

    static  setUserType (reponse :  any){
        this.setValue(this.KEYS.userType,reponse)
    }
    

    static  setPassword (reponse :  any){
        this.setValue(this.KEYS.password,reponse)
    }

    static  setMobileNumber (reponse :  any){
        this.setValue(this.KEYS.mobileNumber,reponse)
    }
    static  setOtpStatus (reponse :  any){
        this.setValue(this.KEYS.isOtpVerified,reponse)
    }

    static async getMobileNumber(){
        return super.get(this.KEYS.mobileNumber);
    }
    static async getUserName(){
        return super.get(this.KEYS.userName);
    }
    static async getPassword(){
        return super.get(this.KEYS.password);
    }
    static async getOtpStatus(){
        return super.get(AppStorage.KEYS.isOtpVerified);
    }
    static async getUserType(){
        return super.get(AppStorage.KEYS.userType);
    }


}