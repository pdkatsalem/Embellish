import 'react-native-gesture-handler';
import * as React from 'react'
import AppNavigation from './Routes/AppNavigation';



export default class App extends React.Component<{},{}> {
  render() {
    return (
        <AppNavigation />
    );
  }
}