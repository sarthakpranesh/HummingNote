import Animated from 'react-native-reanimated';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  Note: undefined;
  AddNote: undefined;
  NotFound: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  Setting: undefined;
}

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

// Screen Params
export type LoadingScreenProps = {
  hasLoaded: () => void;
}

export type AboutScreenProps = any;

export type AnimatedStrokeProps = {
  d: string;
  progress: Animated.SharedValue<number>;
}

export type AuthenticateParam = {
  email: string;
  uid: string;
}
