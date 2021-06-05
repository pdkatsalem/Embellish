import AsyncStorage from "@react-native-async-storage/async-storage";

export default class LocalStorage {

    static async set(key: string, value: any){
        const persist: ILSFormat = {
            type: typeof value,
            value: value
        };
        await AsyncStorage.setItem(key, this.getRaw(persist));
    }

    static async get(key: string): Promise<any> {
        const json = await LocalStorage.getItemJSON(key);
        return json ? json.value : null;
    }

    static async clearStorage(){
        await AsyncStorage.clear();
    }

    static async getItemJSON (key: string): Promise<ILSFormat> {
        let jsonObj = await AsyncStorage.getItem(key)
        jsonObj = jsonObj ? jsonObj : "{}"
        return JSON.parse(jsonObj);
    }

    static getRaw(value: ILSFormat){
        return JSON.stringify(value);
    }


}