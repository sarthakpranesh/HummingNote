import {StyleSheet} from 'react-native';
import Layout from './Layout';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
        width: Layout.isLargeDevice ? 300*3 : Layout.window.width,
        alignSelf: 'center',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 6,
    },
    hummingImageLogo: {
        width: 80,
        height: 80,
        borderRadius: 8,
        alignSelf: 'center',
        marginVertical: 40,
    },
})
