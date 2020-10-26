import Animated from 'react-native-reanimated';

export type RootStackParamList = {
  Home: undefined;
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

export type LoadingScreenProps = {
  hasLoaded: () => void;
}

export type AnimatedStrokeProps = {
  d: string;
  progress: Animated.SharedValue<number>;
}

export type AuthenticateParam = {
  email: string;
  uid: string;
}
