import Animated from 'react-native-reanimated';

export type HomeStackParamList = {
  Home: undefined;
  Note: undefined;
  AddNote: undefined;
}

export type DrawerParamList = {
  HomeStack: undefined;
  Setting: undefined;
}

export type RootStackParamList = {
  Drawer: DrawerParamList;
  NotFound: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User = {
  authenticated: boolean;
  email: string;
  uid: string; 
}

export type AnimatedStrokeProps = {
  d: string;
  progress: Animated.SharedValue<number>;
}

export type AuthenticateParam = {
  email: string;
  uid: string;
}
