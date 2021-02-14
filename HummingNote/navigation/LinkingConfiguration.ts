import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Drawer: {
        screens: {
          HomeStack: {
            screens: {
              Home: "home",
              Note: "note",
              AddNote: "add",
            },
          },
          Settings: "settings",
        },
      },
      NotFound: '*',
    },
  },
};
