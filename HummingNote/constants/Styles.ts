import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 20,
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
