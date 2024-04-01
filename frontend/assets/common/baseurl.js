import { Platform } from 'react-native'


let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'http://192.168.27.88:4000/api/v1/'
: baseURL = 'http://192.168.0.27:4000/api/v1/'
}

export default baseURL;