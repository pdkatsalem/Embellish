import { action, makeObservable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import {View ,Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import loginStore from '../Stores/loginStore'
import rootStore from '../Stores/rootStore'

export interface Iprops{
    loginStore ?: loginStore,
    navigation?:any
}
@inject(()=> ({
    loginStore :rootStore.loginStore 
}))

@observer
export default class SideBar extends React.Component<Iprops,{}>{
    constructor(props : any){
        super(props)
        makeObservable(this)
    }

    @action async logout(){
        await this.props.loginStore?.logout()
        this.props.navigation?.navigate('UserType')
    }
    render(){
        return(
            <View>
                <TouchableOpacity onPress={()=>this.logout()}>
                    <Text>
                        Logout
                    </Text>
                    </TouchableOpacity>
                <Text>
                    sidebar component
                </Text>
            </View>
        )
    }
}