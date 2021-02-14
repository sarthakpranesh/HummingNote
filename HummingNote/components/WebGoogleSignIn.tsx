import React, {useEffect} from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { TouchableOpacity } from 'react-native';

// importing components
import {Text} from '../components/Themed';

WebBrowser.maybeCompleteAuthSession();

export default function App(props: any) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '1034297543601-sc7shcg71uqd4kj851ir2014t4atodlf.apps.googleusercontent.com',
    webClientId: '1034297543601-l6bi1lh2ojj2ievqknq64n2g95mmi7k3.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
  });

  useEffect(() => {
    if (response?.type === 'success') {
        const { authentication } = response;
        fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            method: "GET",
            headers: {
                authorization: "Bearer " + authentication?.accessToken,
            }
        })
            .then((u) => u.json())
            .then((u) => {
                props.onGetUser(u);
            });
    }
  }, [response]);

  return (
      <TouchableOpacity
        disabled={!request}
        onPress={() => {
            promptAsync();
        }}
      >
          <Text>
            Continue With Google
          </Text>
      </TouchableOpacity>
  );
};
