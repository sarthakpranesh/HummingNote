import React, {useEffect} from 'react';
import {SafeAreaView} from '../../components/Themed';
import Svg from  'react-native-svg';
import {Easing, useSharedValue, withTiming} from 'react-native-reanimated';

//importing constants
import AnimatedStroke from '../../components/AnimatedStroke/AnimatedStroke';

//importing Styles
import Styles from '../../constants/Styles';
import * as HmSvg from '../../constants/HummingNoteSvg';

//importing types
import {LoadingScreenProps} from '../../types';

const LoadingScreen = (props: LoadingScreenProps) => {

    const progress = useSharedValue(0);
    useEffect(() => {
        progress.value = withTiming(1, {duration: 4000, easing: Easing.linear})
    }, [progress]);

    setTimeout(() => {
        props.hasLoaded();
    }, 4500);
    
    return (
        <SafeAreaView style={Styles.container}>
            <Svg width={HmSvg.width} height={HmSvg.height} viewBox={`0 0 ${HmSvg.viewBoxWidth} ${HmSvg.viewBoxHight}`}>
                {HmSvg.path.map((d, key) => (
                    <AnimatedStroke progress={progress} d={d} key={key} />
                ))
                }
            </Svg>
        </SafeAreaView>
    )
}

export default LoadingScreen;
