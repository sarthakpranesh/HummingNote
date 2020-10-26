import React from 'react';
import {View} from '../Themed';

const Divider = () => {
    return <View 
        style={{
            marginVertical: 10,
            height: 1,
            width: '80%',
        }}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)" 
    />
}

export default Divider;
