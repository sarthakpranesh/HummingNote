import * as Google from 'expo-google-app-auth';
import {Alert} from 'react-native';

export default async function GoogleSignIn() {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Google.logInAsync({
              androidClientId: '1034297543601-3400h905sl31hliqrq3kqkq4ld7jika8.apps.googleusercontent.com',
              iosClientId: '1034297543601-dta6hejks2d3j11cmmc7el05p17creah.apps.googleusercontent.com',
              androidStandaloneAppClientId: "",
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
  