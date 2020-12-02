import * as Google from 'expo-google-app-auth';
import {Alert} from 'react-native';

export default async function GoogleSignIn() {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Google.logInAsync({
              androidClientId: `1034297543601-kp3hggjodllcecmj3iljs4pc9ptkvvvo.apps.googleusercontent.com`,
              androidStandaloneAppClientId: `1034297543601-kp3hggjodllcecmj3iljs4pc9ptkvvvo.apps.googleusercontent.com`,
              scopes: ['profile', 'email'],
            });
        
            if (result.type === 'success') {
              resolve(result.user);
            } else {
              console.log("Google Sign in type Error:", result.type);
              reject(new Error("User Cancelled"));
            }
        } catch (err) {
            console.log("Google Sign in Error:", err.message);
            Alert.alert("Google Sign in Error", err.message);
            reject(err);
        }
    })
}
  