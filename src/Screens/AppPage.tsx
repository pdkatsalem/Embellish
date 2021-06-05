
import * as React from 'react'
import { action, observable,makeObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Text, View } from 'react-native';
export interface Props { }
export interface State { }

@observer
export default class AppPage extends React.Component<{},{}>{
  @observable valuu : string = 'New page'
  constructor(props : any){
    super(props)
    makeObservable(this)
  }
  @action changeName(){
    this.valuu = 'change value'
  }
    render(){
        return (
        <View>
            <Text>
              {this.valuu}
            </Text>
            <Button title="none" onPress={this.changeName.bind(this)} />
          </View>);
    }
}