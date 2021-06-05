import { action, makeObservable, observable } from "mobx";
import { StoreHttpClient } from "../Util/Httputil";


export default class styleStore {
    @observable selectedStyle : any = {}
    @observable selectedStyleCode : any = ''
    @observable selectedBrand : any = {}
    @observable selectedWashType : any = {}
    @observable selectedWashTypeName : any =''
    @observable fabricList : any =[]
    @observable selectedImagePath : any = ''
    @observable selectedFabric : any = {}
    constructor(){
        this.init()
        makeObservable(this)
    }
    @action async init(){
        this.selectedStyleCode = ''
    }

    @action selectStyle(style:any){
        this.selectedStyle = style
        this.selectedStyleCode = style.name
    }

    @action selectWashType(wash:any){
        this.selectedWashType = wash
        this.selectedWashTypeName = wash.name
    }

    @action getFabricList(fab :any){
        this.fabricList = fab
    }

    @action selectFabric(fab :any){
        this.selectedImagePath = fab.path
        this.selectedFabric =fab
    }

    @action async moveToBoardWashList(navigation : any,isFromOtherMenu : any = false){
        let fabricResponse = await StoreHttpClient().getResponse(`/fabricList?washType=${this.selectedWashType.id}`)
        if (fabricResponse && fabricResponse !=null){
            console.log("fabricList",fabricResponse)
            this.getFabricList(fabricResponse.data)
            if (isFromOtherMenu){
                navigation.navigate('MyBoard',{ fromPath : 'Wash' })
            }
        }
    }

    @action async moveToBoardFromMyMenu(navigation : any,isFromOtherMenu : any = false){
        let fabricResponse = await StoreHttpClient().getResponse(`/fabricList?style=${this.selectedStyle.id}`)
        if (fabricResponse && fabricResponse !=null){
            console.log("fabricList",fabricResponse)
            this.getFabricList(fabricResponse.data)
            if (isFromOtherMenu){
                navigation.navigate('MyBoard',{ fromPath : 'MyMenu' })
            }

        }
    }



}