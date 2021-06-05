import commonStore from "./commonStore";
import loginStore from "./loginStore";
import styleStore from "./styleStore";

class RootStore {
    loginStore : loginStore
    commonStore : commonStore
    styleStore : styleStore
    constructor(){
        this.loginStore =  new loginStore()
        this.commonStore = new commonStore()
        this.styleStore =  new styleStore()
    }
}

const rootStore = new RootStore()
export default rootStore;
