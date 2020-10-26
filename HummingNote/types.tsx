import Animated from 'react-native-reanimated';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
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

export interface LoadingScreenProps {
  hasLoaded: () => void;
}

export interface AnimatedStrokeProps {
  d: string;
  progress: Animated.SharedValue<number>;
}

export interface AuthenticateParam {
  email: string;
  uid: string;
}
