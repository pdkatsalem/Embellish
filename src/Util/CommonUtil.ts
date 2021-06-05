
import Snackbar from 'react-native-snackbar';


export default class CommonUtils {

public static snackBar(snackText: any,actionText : any = "OK",actionTextColor : any ="green" ){
  Snackbar.show({
    text: snackText,
    duration: Snackbar.LENGTH_LONG,
    action: {
      text : actionText,
      textColor : actionTextColor,
      onPress: ()=> {}
    }
  });
}

public static snackBarFunc(snackFun : any,snackText: any,actionText : any = "OK",actionTextColor : any ="green" ){
  Snackbar.show({
    text: snackText,
    duration: Snackbar.LENGTH_LONG,
    action: {
      text : actionText,
      textColor : actionTextColor,
      onPress: ()=> {
        snackFun()
       }
    }
  });
}

}