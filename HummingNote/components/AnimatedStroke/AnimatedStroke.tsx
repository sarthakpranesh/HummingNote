import React, {useRef, useState} from 'react';
import {Path} from 'react-native-svg';
import Animated, {Easing, useAnimatedProps} from 'react-native-reanimated';

interface AnimatedStrokeProps {
    d: string;
    progress: Animated.SharedValue<number>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const colors = ["blue", "yellow", "red"];

const AnimatedStroke = ({d, progress}: AnimatedStrokeProps) => {
    const [length, setLength] = useState(0);
    const ref = useRef<typeof AnimatedPath>(null);

    const backgroundAnimation = useAnimatedProps(() => ({
      strokeDashoffset: length - length * Easing.bezier(0.33, 1, 0.68, 1)(progress.value)
    }));
    const strokeAnimation = useAnimatedProps(() => ({
      strokeDashoffset: length - length * Easing.bezier(0.61, 1, 0.88, 1)(progress.value)
    }));

    const strokeColor = colors[Math.round(Math.random() * (colors.length-1))];

    return (
      <>
        <AnimatedPath
          animatedProps={backgroundAnimation}
          d={d}
          stroke={strokeColor}
          strokeWidth={length === 0 ? 0 : 10}
          strokeDasharray={length}
        />
        <AnimatedPath
          animatedProps={strokeAnimation}
          onLayout={() => setLength(ref.current.getTotalLength())}
          ref={ref}
          d={d}
          stroke="white"
          strokeWidth={length === 0 ? 0 : 10}
          strokeDasharray={length}
        />
      </>
    );
}

export default AnimatedStroke;
