import * as React from 'react';
import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
} from 'react-native';
import {SafeAreaView as DefaultSafeAreaView} from 'react-native-safe-area-context';
import DefaultSvg, {CustomSvgType as DefaultSvgProps} from './Svg/index';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type SafeAreaViewProps = ThemeProps & DefaultSafeAreaView['props'];
export type SvgProps = ThemeProps & DefaultSvgProps;

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultTextInput style={[{ color }, style]} {...otherProps}/>
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}

export function SafeAreaView(props: SafeAreaViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');

  return <DefaultSafeAreaView style={[{backgroundColor, flex: 1}, style]} {...otherProps} />;
}

export function Svg(props: SvgProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultSvg style={style} color={color} {...otherProps}/>;
}
