import * as React from 'react'
import {View,Text} from 'react-native'
import AppDefaults from '../Defaults/AppDefaults'
interface IProps{
    title : any
}
export default class AppHeader extends React.Component<IProps,{}>{

    render(){
        return(
            <View style={{ height:50,
                backgroundColor:AppDefaults.HeaderColor,justifyContent:"center",
                borderBottomLeftRadius:25,
                borderBottomRightRadius:25 }}>
            <Text style={{ color:"white",fontWeight:"bold",textAlign:"center" }}>{this.props.title}</Text>
            </View>
        )
    }
}